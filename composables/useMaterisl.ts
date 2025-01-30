import type { Material, MaterialCategory } from "~/types/database";

export const useMaterial = () => {
  const { $supabase } = useNuxtApp();

  const materials = ref<Material[]>([]);
  const materialCategories = ref<MaterialCategory[]>([]);

  /**
   * 材料の取得
   * @returns
   */
  const fetchMaterials = async () => {
    const res = await $supabase.from("m_material").select();

    // NOTE: 例外系の制御
    if (res.error) {
      console.log("error: ", res.error.message);
      return;
    }
    if (!res.data) {
      materials.value = [];
      return;
    }
    materials.value = res.data;
  };

  /**
   * 材料カテゴリの取得
   * @returns
   */
  const fetchMaterialCategory = async () => {
    const res = await $supabase.from("m_material_category").select();

    // NOTE: 例外系の制御
    if (res.error) {
      console.log("error: ", res.error.message);
      return;
    }
    if (!res.data) {
      materialCategories.value = [];
    }
    materialCategories.value = res.data;
  };

  return {
    materials,
    materialCategories,
    fetchMaterials,
    fetchMaterialCategory,
  };
};
