# getUserCocktails 実装計画

## 1. 現状把握（serenaMCP による確認結果）

- Nuxt 3 + Vuetify 構成。`pages/index.vue` で `useUserMaterial` / `useCocktail` / `useCocktailRecipe` を呼び出し、Supabase から取得した材料リストで作成可能カクテルをフロント側で計算している。
- OpenAI 連携は未実装。`server/` 配下に API ルートは存在せず、サーバーサイドでの Supabase 参照も行っていない。
- 仕様（`.xcode/spec/getUserCocktails.md`）では「ユーザー ID ごとのページ」から Supabase → OpenAI Structured Outputs → Wikipedia 画像 URL を経た結果を最大 100 件返すこと、Wikipedia ドメインのみ許可することなどが求められている。

## 2. 実装ゴール

1. `/cocktails/{userId}` でアクセスした際に、Supabase のユーザー材料を元に OpenAI から作成可能カクテルを JSON Schema 形式で取得し、Wikipedia 画像を付与したレスポンス `{ total, cocktails[] }` を返すサーバー API を用意する。
2. フロントエンドで上記 API を呼び出し、`cocktails` 配列をカード表示できる新ページとコンポーザブルを整備する。
3. Wikipedia ドメイン検証、OpenAI 出力の Zod バリデーション、フォールバック画像 `/images/noimage-760x460.png` を統合し、「実在カクテル」「手持ち材料のみ」「最大 100 件」を強制する。

## 3. サーバサイド設計

### 3.1 依存ライブラリと設定

- 追加パッケージ: `openai`（公式 SDK）, `zod`（構造化バリデーション）, `radash` などの小規模ユーティリティは必要に応じて検討。
- 環境変数（`nuxt.config.ts` → `runtimeConfig` で公開）:
  - `OPENAI_API_KEY` / `OPENAI_PROJECT_ID`（Structured Outputs 用）
  - `SUPABASE_SERVICE_ROLE_KEY` と `SUPABASE_URL`（server only）
  - `USER_COCKTAIL_LIMIT`（デフォルト 100）
  - `WIKIPEDIA_IMAGE_FALLBACK`（`/images/noimage-760x460.png` を既定値に）
- `.env` のサンプル更新と README 補記を行い、Hardcode されている `plugins/supabase.ts` の anon key も将来的に env 化する旨を記載。

### 3.2 Supabase クライアント再利用

- 既存の `plugins/supabase.ts` で `supabaseClient` が初期化済みのため、新規サーバークライアントは作成せず `useSupabaseClient<Database>()` を通じて同一のクライアントを再利用する。
- `t_user_material` から指定 `user_id` の rows を取得し、`m_material` を Join して `material_name` / `category` を付与する処理はこのクライアント経由で行う。Composable 側から直接 Supabase を叩けるように `fetchUserMaterialsWithMeta` 相当のロジックは関数として切り出しつつも `plugins/supabase.ts` のクライアントを使う。
- 無材料の場合は空配列を返し、Supabase エラーは呼び出し元コンテキストで `createError({ statusCode: 500, statusMessage: ... })` へ整形する。

### 3.3 API ルート `server/api/user-cocktails/[userId].get.ts`

1. `defineEventHandler` 内で `event.context.params.userId` を読み取り、UUID フォーマットを最低限バリデーション（`z.string().uuid()` 等）。
2. `USER_COCKTAIL_LIMIT` と `?limit=` クエリを比較し、`limit = Math.min(envLimit, queryLimit ?? envLimit)` で上限を統一。
3. `fetchUserMaterialsWithMeta` で `materials` を取得。空なら `{ total: 0, cocktails: [] }` を早期リターン。
4. OpenAI 用プロンプトデータを構成（下記 3.4 / 3.5 参照）し、`openai.responses.create` で Structured Outputs を要求。
5. 返却 JSON を Zod で検証後、以下ポストプロセスを実施。
   - `cocktail.image_url` が `*.wikipedia.org` もしくは `*.wikimedia.org` でなければフォールバックへ置換。
   - `ingredients.every(i => i.is_user_material)` を満たさないものは除外（AI 側で除外されている想定だが二重で検証）。
   - `cocktails.slice(0, limit)` に揃え、`total` も切り詰め後の件数に上書き。
6. OpenAI 側エラー（RateLimit, InvalidSchema 等）は `createError({ statusCode: 502, ... })` で 5xx 返却し、詳細は `console.error` ログにのみ残す。

### 3.4 JSON Schema / Zod 定義

```ts
const CocktailSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().min(1).max(200),
  image_url: z.string().url(),
  difficulty: z.enum(["easy", "normal", "hard"]),
  alcohol_level: z.enum(["low", "medium", "high"]),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string().min(1),
      is_user_material: z.literal(true),
    })
  ),
  missing_ingredients: z.tuple([]),
  steps: z.array(z.string().min(1)).min(1),
});

const ResponseSchema = z.object({
  total: z.number().int().nonnegative(),
  cocktails: z.array(CocktailSchema).max(limitFromEnv),
});
```

- `missing_ingredients` は仕様上空配列固定のため `z.tuple([])` で空のみ許可。
- Schema は `response_format: { type: "json_schema", json_schema: {...} }` にそのまま流用し、Zod では最終チェックのみ実施。

### 3.5 OpenAI プロンプト

- **System**: 仕様「実在のカクテル」「Wikipedia ページと画像必須」「Structured Outputs 厳守」「不足材料は禁止」「最大件数は {limit}」を明文化。JSON 以外の出力や余分なテキストを禁止する文言を入れる。
- **User**:
  - `userId`
  - `materials`: `[{ name, category }]` リストを markdown テーブルで渡す
  - 「Wikipedia 画像が存在しない場合は結果から除外」「世界的認知度が高い順で優先」など仕様項目を bullet で再記述。
- **Tool**: Structured Outputs で JSON Schema を添付。

### 3.6 Wikipedia 画像検証

- `utils/wikipedia.ts` に `isWikipediaImageUrl(url: string)` を定義（`URL` オブジェクトでパースし `hostname.endsWith(".wikipedia.org") || hostname.endsWith(".wikimedia.org")`）。
- API ルートから共通利用し、無効 URL は `/images/noimage-760x460.png` へ置換。

## 4. フロント実装計画

### 4.1 新規コンポーザブル `composables/useUserCocktails.ts`

- `const cocktails = useState('user-cocktails', () => []);` など SSR でも共有できる形で定義。
- Supabase API の実行はこの Composable 内で完結させ、`useSupabaseClient()` で取得したクライアントを使って `t_user_material` および関連テーブルへ直接クエリを投げる。その結果を OpenAI 連携や API 呼び出しに連結し、`data`, `pending`, `error`, `refresh` を返す。
- `userMaterials` を取得済みであれば、材料リスト変更後に再フェッチできるよう watch を仕込み、`loginUserId` の変化にも追従。

### 4.2 ルーティング / ページ

- `pages/cocktails/[userId].vue` を追加し、`useRoute()` から ID を取得して `useUserCocktails` を呼ぶ。
- ページ構造:
  - ヘッダー: ユーザー名／ID、材料編集ページ (`/userMaterial`) へのボタン。
  - カードグリッド: `cocktail.image_url` 表示、`name`, `description`, `difficulty`, `alcohol_level`, `steps` を段落やチップで可視化。
  - 空状態: 「材料が登録されていない or カクテルが見つからない」メッセージと材料登録誘導 CTA。
- 既存の `pages/index.vue` では `onMounted` + watch で同期計算しているが、将来的には `/` から `/cocktails/{userId}` へ router push する導線を追加し、`fetchUserCocktails` ロジックを削除し `useUserCocktails` 呼び出しへ置換。

### 4.3 既存コンポーザブルの整理

- `useUserMaterial` はフロント認証前提なので現状維持。ただし `loginUserId` を `pages/cocktails/[userId].vue` と紐付けるか、パラメータ ID を直接渡す形に変更するか検討（ログイン中ユーザー以外の材料閲覧を許可しない場合は整合確認が必要）。
- `useCocktail` / `useCocktailRecipe` は今回のフローでは使用しなくなるため、削除するか「旧ロジック専用」として隔離。段階的移行のため当面残す場合はコメントで非推奨を明記。

## 5. ロギングとエラーハンドリング

- OpenAI からのレスポンス本文はログ出力しない。`requestId`, `userId`, `materialCount`, `errorCode` 程度のメタ情報のみを `console.error` に出す。
- クライアントへは `statusCode` + `message`（ユーザー向け）はシンプルにし、「現在カクテルを取得できませんでした。しばらくしてから再度お試しください。」等のテキストを返す。
- Supabase, OpenAI, バリデーションなどエラー発生点ごとに `H3Error` を投げ、Nuxt 側で一括ハンドリング。

## 6. テスト / 検証

- **ユニットテスト**: `utils/wikipedia.spec.ts` 等で URL 判定と schema バリデーション関数を検証（Vite Test or Vitest を導入済みであれば使用）。
- **統合テスト / 手動チェック**:
  1. 材料が十分なユーザー ID で API を叩き、100 件以内で結果が返ることを確認。
  2. Wikipedia 以外の画像 URL を意図的に混ぜたモックレスポンスでフォールバックが機能するか確認。
  3. 材料ゼロのユーザーで空レスポンス + UI メッセージを確認。
  4. OpenAI 失敗時にエラーメッセージとリトライ動線が表示されることを確認。

## 7. 未決事項 / フォローアップ

- `/cocktails/{userId}` を認証不要で公開するか、`loginUserId` と一致するユーザーのみアクセスさせるか。アクセス制御ポリシーに応じて Supabase RLS やルートガードを調整する必要がある。
- OpenAI 応答のキャッシュ有無（Supabase に結果を保存して TTL を設ける等）について要判断。低頻度アクセスならキャッシュ不要だがコスト削減を優先するなら追補。
- 大量材料（>50）送信時のトークン数対策として、材料名の正規化やカテゴリ集約を行うか要検討。
