import type { Database } from "@/types/supabase";
export type Cocktail = Database["public"]["Tables"]["m_cocktail"]["Row"];
export type Material = Database["public"]["Tables"]["m_material"]["Row"];
export type MaterialCategory =
  Database["public"]["Tables"]["m_material_category"]["Row"];
export type CocktailMaterial =
  Database["public"]["Tables"]["m_cocktail_material"]["Row"];
export type UserMaterial =
  Database["public"]["Tables"]["t_user_material"]["Row"];
