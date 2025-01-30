export const useCocktailRecipe = () => {
  const { $supabase } = useNuxtApp();

  /**
   * 材料IDリストを含むカクテルレシピリストを取得する
   * @param materialIds
   * @returns
   */
  const fetchCocktailRecipesByMaterialIds = async (materialIds: string[]) => {
    return (
      await $supabase
        .from("m_cocktail_recipe")
        .select()
        .in("material_id", materialIds)
    ).data;
  };

  /**
   * カクテルIDリストを含むカクテルレシピリストを取得する
   * @param cocktailIds
   * @returns
   */
  const fetchCocktailRecipesByCocktailIds = async (cocktailIds: string[]) => {
    return (
      await $supabase
        .from("m_cocktail_recipe")
        .select()
        .in("cocktail_id", cocktailIds)
    ).data;
  };

  return {
    fetchCocktailRecipesByMaterialIds,
    fetchCocktailRecipesByCocktailIds,
  };
};
