const isLogin = ref(false);

export const useLogin = () => {
  const { $supabase } = useNuxtApp();

  /** セッションの確認 */
  $supabase.auth.getSession().then(({ data }) => {
    isLogin.value = !!data.session;
  });

  /** ログイン状態の監視 */
  $supabase.auth.onAuthStateChange((event) => {
    console.log("aaaaa");
    if (event == "SIGNED_IN") {
      isLogin.value = true;
    }
  });

  return {
    isLogin,
  };
};
