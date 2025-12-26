import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

export default defineNuxtPlugin(() => {
  // TODO: env 化する
  const supabaseUrl = "https://zvtuojdxswbkprsxvfqz.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dHVvamR4c3dia3Byc3h2ZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzODUwODcsImV4cCI6MjA3ODk2MTA4N30.bq1F-1ELcbyW7KqDSvOghY6rsT8iJGjsqI_a35QXBEY";
  const supabase = createClient<Database>(supabaseUrl, supabaseKey);

  return {
    provide: {
      supabase,
    },
  };
});
