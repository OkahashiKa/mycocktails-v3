<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Cocktail } from "~/types/database";

const cocktails = ref<Cocktail[]>([]);
const dialog = ref(false);

const router = useRouter();
const { fetchCocktailByIds } = useCocktail();
const { userMaterials } = useUserMaterial();
const { fetchCocktailRecipesByMaterialIds, fetchCocktailRecipesByCocktailIds } =
  useCocktailRecipe();

onMounted(() => {
  fetchUserCocktails();
});

// ユーザー材料取得後にユーザーカクテルを取得
watch(userMaterials, async () => {
  if (!userMaterials) return;
  fetchUserCocktails();
});

const fetchUserCocktails = async () => {
  const userMaterialIds = userMaterials.value.map((x) => x.material_id);

  // ユーザー材料を含むカクテルレシピを全件取得する
  const relatedCocktailMaterials = await fetchCocktailRecipesByMaterialIds(
    userMaterialIds
  );
  if (!relatedCocktailMaterials) return;

  // cocktail_idの重複排除
  const uniqueCocktailIds = [
    ...new Set(relatedCocktailMaterials.map((x) => x.cocktail_id)),
  ];

  // 対象のカクテルに必要なレシピを全件取得
  const requiredCocktailMaterials = await fetchCocktailRecipesByCocktailIds(
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
};
</script>

<template>
  <div>
    <h2>現在作成可能なカクテル</h2>
    <v-card
      v-for="cocktail in cocktails"
      :key="cocktail.id"
      class="mx-auto"
      max-width="250"
      @click="dialog = true"
    >
      <v-img :width="250" cover :src="cocktail.image!" />
      <v-card-title>
        {{ cocktail.name }}
      </v-card-title>
      <v-dialog v-model="dialog" width="auto">
        <v-card :title="cocktail.name" />
      </v-dialog>
    </v-card>
    <v-btn text="ユーザー材料の登録" @click="router.push('./userMaterial')" />
  </div>
</template>
