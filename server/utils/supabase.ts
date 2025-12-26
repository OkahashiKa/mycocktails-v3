import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/types/supabase";

type SupabaseOptions = {
  url?: string | null;
  serviceRoleKey?: string | null;
};

export const createServiceSupabaseClient = ({
  url,
  serviceRoleKey,
}: SupabaseOptions) => {
  if (!url || !serviceRoleKey) {
    throw new Error("Supabase の接続情報が設定されていません。");
  }

  return createClient<Database>(url, serviceRoleKey);
};

export type SupabaseServiceClient = SupabaseClient<Database>;
