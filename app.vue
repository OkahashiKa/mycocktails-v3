<script setup>
const cocktails = ref([]);
const { $supabase } = useNuxtApp();

async function getCocktails() {
  const { data } = await $supabase.from("m_cocktail").select();
  cocktails.value = data;
}

onMounted(() => {
  getCocktails();
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    <ul>
      <li v-for="cocktail in cocktails" :key="cocktail.id">
        {{ cocktail.name }}
      </li>
    </ul>
  </div>
</template>
