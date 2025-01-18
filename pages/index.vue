<script setup lang="ts">
import type { Cocktail } from "~/types/database";

const userId = ref<string>("");
const cocktails = ref<Cocktail[]>([]);

const { $supabase } = useNuxtApp();

async function fetchCocktailByIds(ids: string[]) {
  return (await $supabase.from("m_cocktail").select().in("id", ids)).data;
}

const fetchUserMaterials = async () => {
  return (await $supabase.from("t_user_material").select()).data;
};

const fetchCocktailMaterialByMaterialIds = async (materialIds: string[]) => {
  return (
    await $supabase
      .from("m_cocktail_material")
      .select()
      .in("material_id", materialIds)
  ).data;
};

const fetchCocktailMaterialsByCocktailIds = async (cocktailIds: string[]) => {
  return (
    await $supabase
      .from("m_cocktail_material")
      .select()
      .in("cocktail_id", cocktailIds)
  ).data;
};

onMounted(async () => {
  // ログインユーザーIDの取得
  // TODO: useUserのみたいなcomposable化する
  userId.value = (await $supabase.auth.getUser()).data.user?.id ?? "";

  // ユーザー材料を取得する
  const userMaterials = await fetchUserMaterials();
  if (!userMaterials) return;

  const userMaterialIds = userMaterials.map((x) => x.material_id);

  // ユーザー材料を含むカクテルレシピを全件取得する
  const relatedCocktailMaterials = await fetchCocktailMaterialByMaterialIds(
    userMaterialIds
  );
  if (!relatedCocktailMaterials) return;

  // cocktail_idの重複排除
  const uniqueCocktailIds = [
    ...new Set(relatedCocktailMaterials.map((x) => x.cocktail_id)),
  ];

  // 対象のカクテルに必要なレシピを全件取得
  const requiredCocktailMaterials = await fetchCocktailMaterialsByCocktailIds(
    uniqueCocktailIds
  );
  if (!requiredCocktailMaterials) return;

  // 対象のカクテル内で材料が全てユーザー材料に含まれているものを抽出する
  const availableCocktailIds = uniqueCocktailIds.filter((cocktailId) => {
    const materialIds = requiredCocktailMaterials
      .filter((x) => x.cocktail_id === cocktailId)
      .map((x) => x.material_id);

    return materialIds.every((id) => userMaterialIds.includes(id));
  });

  // ユーザー材料で作成可能なカクテルを取得する
  const availableCocktails = await fetchCocktailByIds(availableCocktailIds);
  if (!availableCocktails) return;

  cocktails.value = availableCocktails;
});
</script>

<template>
  <div>
    <h2>作成可能なカクテル</h2>
    <ul>
      <li v-for="cocktail in cocktails" :key="cocktail.id">
        {{ cocktail.name }}
      </li>
    </ul>
  </div>
</template>
