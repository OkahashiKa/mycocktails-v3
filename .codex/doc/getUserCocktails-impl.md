# getUserCocktails 実装メモ

## サーバー (`server/api/user-cocktails/[userId].get.ts`)

- Supabase Service Role で `t_user_material` と `v_material` を参照し、ユーザー材料を `UserMaterialWithMeta` に整形。
- OpenAI Responses API (`gpt-4.1-mini`) + Structured Outputs を使用し、JSON Schema で `{ total, cocktails[] }` を生成。
- `zod` でレスポンスを再検証し、Wikipedia/Wikimedia 以外の画像は `/images/noimage-760x460.png` に置換。
- `limit` クエリは `USER_COCKTAIL_LIMIT` の上限で丸め、材料が無い場合は即 `{ total: 0, cocktails: [] }` を返す。

## フロント (`pages/cocktails/[userId].vue`)

- ルート `/cocktails/{userId}` で `useUserCocktails` composable から API を呼び出し。
- `pages/index.vue` はログイン完了後に `/cocktails/{userId}` へリダイレクトするだけのエントリ。
- カード UI では難易度・アルコール強度チップ、材料リスト、作り方を Vuetify コンポーネントで表示。

## その他

- `.env.example` を新規作成し、OpenAI/Supabase/Fallback に関する全変数を列挙。
- Nuxt `runtimeConfig` に機密情報を登録し、`public.userCocktailFallbackImage` をフロントでも使用可能にした。
- README に API 仕様と環境変数の手順を追記。 plugins/supabase.ts は anon key を env 化予定である旨のコメントを追加。
