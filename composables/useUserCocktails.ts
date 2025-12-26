import type { UserCocktailResponse } from "~/types/user-cocktails";

export const useUserCocktails = () => {
  const data = useState<UserCocktailResponse | null>(
    "user-cocktails",
    () => null
  );
  const pending = ref(false);
  const error = ref<string | null>(null);

  const fetchUserCocktails = async (userId: string, limit?: number) => {
    if (!userId) return;

    pending.value = true;
    error.value = null;

    try {
      data.value = await $fetch<UserCocktailResponse>(
        `/api/user-cocktails/${userId}`,
        {
          query: limit ? { limit } : undefined,
        }
      );
    } catch (err) {
      console.error("failed to fetch user cocktails", err);
      error.value = extractErrorMessage(err);
      data.value = null;
    } finally {
      pending.value = false;
    }
  };

  return {
    data,
    pending,
    error,
    fetchUserCocktails,
  };
};

const extractErrorMessage = (err: unknown) => {
  if (
    err &&
    typeof err === "object" &&
    "statusMessage" in err &&
    typeof (err as any).statusMessage === "string"
  ) {
    return (err as any).statusMessage;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "カクテルの取得に失敗しました。";
};
