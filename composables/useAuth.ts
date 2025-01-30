const isLogin = ref<boolean>(false);
const loginUserId = ref<string>("");

export const useAuth = () => {
  const { $supabase } = useNuxtApp();

  /** セッションの確認 */
  $supabase.auth.getSession().then(({ data }) => {
    if (data.session) {
      isLogin.value = true;
      $supabase.auth
        .getUser()
        .then((x) => (loginUserId.value = x.data.user!.id));
    }
  });

  /** ログイン状態の監視 */
  $supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") {
      isLogin.value = true;
      // ユーザーGUIDを取得する
      $supabase.auth
        .getUser()
        .then((x) => (loginUserId.value = x.data.user!.id));
    }
  });

  return {
    isLogin,
    loginUserId,
  };
};
