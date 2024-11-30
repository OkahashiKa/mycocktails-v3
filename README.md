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

## reference

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.
Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
