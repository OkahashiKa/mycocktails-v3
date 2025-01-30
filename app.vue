<script setup lang="ts">
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supa-kit/auth-ui-vue";

const { $supabase } = useNuxtApp();
const { isLogin } = useAuth();
</script>

<template>
  <v-app>
    <Auth
      v-if="!isLogin"
      :supabase-client="$supabase"
      :providers="['google', 'github']"
      :appearance="{
        theme: ThemeSupa,
      }"
    />
    <router-view v-else />
  </v-app>
</template>
