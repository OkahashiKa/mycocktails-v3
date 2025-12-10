<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supa-kit/auth-ui-vue";
import { isPublicPath } from "~/utils/publicRoutes";

const route = useRoute();
const { $supabase } = useNuxtApp();
const { isLogin } = useAuth();

const isRoutePublic = computed(() => isPublicPath(route.path));
</script>

<template>
  <v-app>
    <Auth
      v-if="!isLogin && !isRoutePublic"
      :supabase-client="$supabase"
      :providers="['google', 'github']"
      :appearance="{
        theme: ThemeSupa,
      }"
    />
    <NuxtPage v-else />
  </v-app>
</template>
