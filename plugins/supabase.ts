import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin(() => {
  const supabaseUrl = "https://ccvudjdclapiexubmnzr.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjdnVkamRjbGFwaWV4dWJtbnpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5NzA0OTgsImV4cCI6MjA0ODU0NjQ5OH0.RBngWPU-muRzajZoY72I0bSV3UBNQpsRict13RuXJ_A";
  const supabase = createClient(supabaseUrl, supabaseKey);

  return {
    provide: {
      supabase,
    },
  };
});
