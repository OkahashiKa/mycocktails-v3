<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const { isLogin, loginUserId } = useAuth();

watchEffect(() => {
  if (isLogin.value && loginUserId.value) {
    router.replace(`/cocktails/${loginUserId.value}`);
  }
});
</script>

<template>
  <div class="d-flex flex-column align-center justify-center py-12">
    <v-progress-circular indeterminate color="primary" class="mb-4" />
    <p class="text-body-2 text-medium-emphasis">
      カクテル一覧ページへ移動しています…
    </p>
  </div>
</template>
