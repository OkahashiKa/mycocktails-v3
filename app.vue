<script setup lang="ts">
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supa-kit/auth-ui-vue";

const { $supabase } = useNuxtApp();
const { isLogin } = useLogin();
</script>

<template>
  <Auth
    v-if="!isLogin"
    :supabase-client="$supabase"
    :providers="['google', 'github']"
    :appearance="{
      theme: ThemeSupa,
    }"
  />
  <router-view v-else />
</template>
