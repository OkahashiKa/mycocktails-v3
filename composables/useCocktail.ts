export const useCocktail = () => {
  const { $supabase } = useNuxtApp();

  /**
   * カクテルIDリストに紐づくカクテルリストを取得する
   * @param ids
   * @returns
   */
  const fetchCocktailByIds = async (ids: string[]) => {
    const res = await $supabase.from("m_cocktail").select().in("id", ids);

    // NOTE: 例外系の制御
    if (res.error) {
      console.log("error: ", res.error.message);
      return;
    }
    if (!res.data) return;
    return res.data;
  };

  return {
    fetchCocktailByIds,
  };
};
