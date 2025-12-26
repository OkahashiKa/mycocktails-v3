import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  pages: true,
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@nuxt/eslint",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config!.plugins!.push(vuetify({ autoImport: true }));
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
  runtimeConfig: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      projectId: process.env.OPENAI_PROJECT_ID,
    },
    supabase: {
      url: process.env.SUPABASE_URL,
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    userCocktailLimit: process.env.USER_COCKTAIL_LIMIT ?? "100",
    wikipediaImageFallback:
      process.env.WIKIPEDIA_IMAGE_FALLBACK ?? "/images/noimage-760x460.png",
    public: {
      userCocktailFallbackImage:
        process.env.WIKIPEDIA_IMAGE_FALLBACK ?? "/images/noimage-760x460.png",
    },
  },
});
