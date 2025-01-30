# mycocktails-v3

mycocktails-v3 の フロントエンド を Nuxt.js(vue3) に置き換え

## Nuxt.js

1. Nuxt.js アプリケーションの作成

   ```bash
   npx nuxi init mycocktails-v3
   yarn install
   ```

2. 開発サーバーの起動

   ```bash
   yarn dev
   ```

## TypeScript

開発は TypeScript で行うため導入する。

```bash
yarn add --dev typescript
```

## ESLint

Nuxt の公式で ESLint のモジュールが提供されているため、基本的にこれを使う。

[ESLint Module](https://eslint.nuxt.com/packages/module)

1. eslint モジュールをプロジェクトに追加する

   ```bash
   npx nuxi module add eslint
   ```

2. 必要に応じて以下の設定ファイルを編集する。

   > eslint.config.mjs

3. scripts への追記
   package.json の scripts に lint の実行と、フォーマットの実行を追加する。

   ```json
   {
     "scripts": {
       "lint": "eslint .",
       "format": "eslint --fix . "
     }
   }
   ```

## VueRouter

Vue3 ではページルーティングが提供されているため、これを使用してルーティングを実現する。

1. ページルーテイングの有効化
   nuxt.config.ts を編集する

   ```ts
   export default defineNuxtConfig({
     pages: true,
   });
   ```

2. app.vue の設定
   `<router-view />`タグで囲ってある箇所がルーティングの対象となるため app.vue に設定する

   ```vue
   <template>
     <div>
       <router-view />
     </div>
   </template>
   ```

## Vuetify

後々は UI コンポーネントも自作していきたいが、一旦は開発効率を高めるために UI フレームワークを使用する。

1. vuetify を追加する

   ```bash
   yarn add -D vuetify vite-plugin-vuetify
   yarn add @mdi/font
   ```

2. nuxt.config.ts を編集する

   ```ts
   import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
   export default defineNuxtConfig({
     build: {
       transpile: ["vuetify"],
     },
     modules: [
       (_options, nuxt) => {
         nuxt.hooks.hook("vite:extendConfig", (config) => {
           config.plugins.push(vuetify({ autoImport: true }));
         });
       },
     ],
     vite: {
       vue: {
         template: {
           transformAssetUrls,
         },
       },
     },
     css: ["@mdi/font/css/materialdesignicons.css"],
   });
   ```

3. plugins/vuetify.ts を作成する

   ```ts
   import "vuetify/styles";
   import { createVuetify } from "vuetify";

   export default defineNuxtPlugin((app) => {
     const vuetify = createVuetify({});
     app.vueApp.use(vuetify);
   });
   ```

4. app.vue に v-app コンポーネントの追加

   ```ts
   <template>
     <v-app>
       <NuxtPage />
     </v-app>
   </template>
   ```

[vuetify getting-started](https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3)

## Supabase

[mycocktails-v3](https://supabase.com/dashboard/project/ccvudjdclapiexubmnzr)

### 環境構築

[Use Supabase with NuxtJS](https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs)

1. インストール

   ```bash
   yarn add @supabase/supabase-js
   ```

2. /plugin 内に supabase.ts を作成する

   ```ts
   import { createClient } from "@supabase/supabase-js";

   export default defineNuxtPlugin(() => {
     const supabaseUrl = "https://ccvudjdclapiexubmnzr.supabase.co";
     const supabaseKey =
       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdnVkamRjbGFwaWV4dWJtbnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzA0OTgsImV4cCI6MjA0ODU0NjQ5OH0.RBngWPU-muRzajZoY72I0bSV3UBNQpsRict13RuXJ_A";
     const supabase = createClient(supabaseUrl, supabaseKey);

     return {
       provide: {
         supabase,
       },
     };
   });
   ```

   defineNuxtPlugin 内で provide を使用することで、アプリ全体にカスタムプロパティを注入することができる。
   注入されたプロパティは、useNuxtApp() を通じてどこでもアクセス可能。

   ```ts
   const { $supabase } = useNuxtApp();
   ```

### Supabase Auth

※フェーズ 1 では認証は実装せず基本となる機能を実装する

認証機能については Supabase の認証機能を使用し、UI についても Supabase が提供しているものを使用する。
※今後サイト全体のレイアウトが確定した際に、必要であれば実装し直す。

[Supabase Docs Auth UI](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

1. 必要パッケージのインストール

   ```bash
   yarn add @supabase/auth-ui-shared @supa-kit/auth-ui-vue
   ```

2. `<Auth>`コンポーネントを使用して認証を実装する

   ```ts
   <script setup>
   import { ThemeSupa } from "@supabase/auth-ui-shared";
   import { Auth } from "@supa-kit/auth-ui-vue";
   </script>

   <template>
     <Auth
       :supabase-client="$supabase"
       :providers="['google', 'github']"
       :appearance="{
         theme: ThemeSupa,
       }"
     />
   </template>
   ```

   ![supabase-auth-ui](/images/supabase-auth-ui.png)

3. `onAuthStateChange`を使用してログイン状態を監視する
   Vue Router は SPA として動作するため、redirectTo がフルリロード（完全な URL のリダイレクト）をトリガーし正しくリダイレクトが行われないため`onAuthStateChange`でログイン状態を監視し、vueRouter の機能でリダイレクトを行う

   ```ts
   $supabase.auth.onAuthStateChange((event) => {
     if (event === "SIGNED_IN") {
       router.push("/home");
     }
   });
   ```

### Supabase の型生成

supabase 上で使用している型を自動生成する提供する機能を持っているため、これを使用して型安全に開発を行う。

#### supabase の型の自動生成

1. supabase CLI のインストール

   ```bash
   yarn add supabase
   ```

2. supabase の初期化
   /supabase フォルダさ作成され、設定ファイルが格納されます。

   ```bash
   supabase init
   ```

3. Supabase Project の連携
   型を自動生成する Supabase Project と連携します。
   Reference ID は、Project Settings から取得できます。

   ```bash
   supabase link --project-ref <プロジェクトのReference ID>
   ```

4. 型の生成

   ```bash
   supabase gen types typescript --linked > types/supabase.ts
   ```

#### 型安全なデータ取得

supabaseClient を生成する際に、上記で生成した型の`Database`を設定することで`supabase.from.select()`等を行う際に自動的に型付けが行われ、型安全にデータ操作が可能です。

```ts
const supabase = createClient<Database>(supabaseUrl, supabaseKey);
```

![type safe select](images/2025-01-11-01-07-51.png)

Supabase 上のデータベース定義を更新した場合は、再度型の自動生成を行い定義を更新する。

## reference

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## pass

supabaseDB: 2W7ePy4PmrejIGWz
