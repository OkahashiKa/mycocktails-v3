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

## reference

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
