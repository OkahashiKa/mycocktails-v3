import type { UserMaterial } from "~/types/database";

const userMaterials = ref<UserMaterial[]>([]);

export const useUserMaterial = () => {
  const { $supabase } = useNuxtApp();
  const { loginUserId } = useAuth();

  watch(loginUserId, () => {
    fetchUserMaterials();
  });

  /**
   * ユーザー材料の取得
   * @returns
   */
  const fetchUserMaterials = async () => {
    if (!loginUserId.value) return;

    const res = await $supabase
      .from("t_user_material")
      .select()
      .eq("user_id", loginUserId.value);

    // NOTE: 例外系の制御
    if (res.error) {
      console.log("error: ", res.error.message);
      return;
    }
    if (!res.data) {
      userMaterials.value = [];
      return;
    }

    userMaterials.value = res.data;
  };

  /**
   * ユーザー材料の更新
   * 未登録の場合は登録し、登録済みの場合は削除する。
   * @param materialId
   * @returns
   */
  const toggleUserMaterial = async (materialId: string) => {
    if (!loginUserId.value) return;

    if (
      userMaterials.value.find(
        (x) => x.user_id === loginUserId.value && x.material_id === materialId
      )
    ) {
      // 存在する
      const res = await $supabase
        .from("t_user_material")
        .delete()
        .eq("user_id", loginUserId.value)
        .eq("material_id", materialId);

      if (res.error) {
        console.log("error: ", res.error.message);
        return;
      }
    } else {
      // 存在しない
      const req = {
        user_id: loginUserId.value,
        material_id: materialId,
      } as UserMaterial;

      const res = await $supabase
        .from("t_user_material")
        .insert([req])
        .select();

      if (res.error) {
        console.log("error: ", res.error.message);
        return;
      }
    }

    // ユーザー材料の更新
    fetchUserMaterials();
  };

  return {
    userMaterials,
    fetchUserMaterials,
    toggleUserMaterial,
  };
};
