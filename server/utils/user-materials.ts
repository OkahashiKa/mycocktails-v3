import type { SupabaseServiceClient } from "~/server/utils/supabase";

export type UserMaterialWithMeta = {
  id: string;
  name: string;
  category: string | null;
};

export const fetchUserMaterialsWithMeta = async (
  client: SupabaseServiceClient,
  userId: string
): Promise<UserMaterialWithMeta[]> => {
  const { data, error } = await client
    .from("t_user_material")
    .select("material_id")
    .eq("user_id", userId);

  if (error) {
    throw new Error(
      `ユーザー材料の取得に失敗しました: ${error.message ?? "unknown"}`
    );
  }

  if (!data?.length) {
    return [];
  }

  const materialIds = [
    ...new Set(
      data
        .map((row) => row.material_id)
        .filter((materialId): materialId is string => Boolean(materialId))
    ),
  ];

  if (!materialIds.length) {
    return [];
  }

  const { data: materials, error: materialError } = await client
    .from("v_material")
    .select("id, name, category_name")
    .in("id", materialIds);

  if (materialError) {
    throw new Error(
      `材料マスタの取得に失敗しました: ${materialError.message ?? "unknown"}`
    );
  }

  return (
    materials
      ?.filter(
        (
          item
        ): item is {
          id: string;
          name: string;
          category_name: string | null;
        } => Boolean(item.id && item.name)
      )
      .map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category_name ?? null,
      })) ?? []
  );
};
