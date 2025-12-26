<script setup lang="ts">
import type { UserCocktail } from "~/types/user-cocktails";
const route = useRoute();
const router = useRouter();
const runtimeConfig = useRuntimeConfig();

const fallbackImage = runtimeConfig.public.userCocktailFallbackImage;
const userId = computed(() => {
  const param = route.params.userId;
  if (Array.isArray(param)) return param[0] ?? "";
  return typeof param === "string" ? param : "";
});

const { data, pending, error, fetchUserCocktails } = useUserCocktails();

const cocktails = computed(() => data.value?.cocktails ?? []);
const total = computed(() => data.value?.total ?? 0);

const loadCocktails = () => {
  if (!userId.value) return;
  fetchUserCocktails(userId.value);
};

watch(
  userId,
  () => {
    loadCocktails();
  },
  { immediate: true }
);

const handleRetry = () => {
  loadCocktails();
};

const goToUserMaterial = () => {
  router.push("/userMaterial");
};

const difficultyLabel = (value: UserCocktail["difficulty"]) => {
  switch (value) {
    case "easy":
      return "やさしい";
    case "normal":
      return "ふつう";
    case "hard":
    default:
      return "むずかしい";
  }
};

const alcoholLabel = (value: UserCocktail["alcohol_level"]) => {
  switch (value) {
    case "low":
      return "低め";
    case "medium":
      return "普通";
    case "high":
    default:
      return "強め";
  }
};
</script>

<template>
  <v-container class="py-8" fluid>
    <v-row class="align-center mb-6">
      <v-col cols="12" md="8">
        <div class="text-h5 font-weight-bold">
          ユーザー ID: {{ userId || "未指定" }}
        </div>
        <p class="text-body-2 text-medium-emphasis">
          登録済みの材料だけで作れるカクテルを最大 100 件まで検索します。
        </p>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-end" style="gap: 8px">
        <v-btn color="primary" variant="flat" @click="loadCocktails">
          再読み込み
        </v-btn>
        <v-btn color="secondary" variant="tonal" @click="goToUserMaterial">
          材料を編集
        </v-btn>
      </v-col>
    </v-row>

    <v-alert
      v-if="error"
      type="error"
      class="mb-6"
      title="カクテル一覧を取得できませんでした"
    >
      <div class="mb-3">
        {{ error }}
      </div>
      <v-btn size="small" color="primary" @click="handleRetry">
        再試行
      </v-btn>
    </v-alert>

    <v-progress-linear
      v-if="pending"
      color="primary"
      indeterminate
      class="mb-6"
    />

    <v-alert
      v-else-if="!error && !pending && !cocktails.length"
      type="info"
      title="表示できるカクテルがありません"
      class="mb-6"
    >
      材料が登録されていないか、一致するカクテルが見つかりませんでした。
      材料登録ページから手持ちの材料を追加して再度お試しください。
    </v-alert>

    <div v-else>
      <div class="text-subtitle-1 mb-4">
        {{ total }} 件のカクテルが見つかりました
      </div>
      <v-row dense>
        <v-col
          v-for="cocktail in cocktails"
          :key="cocktail.id"
          cols="12"
          md="6"
          lg="4"
          class="d-flex"
        >
          <v-card class="w-100">
            <v-img
              :src="cocktail.image_url || fallbackImage"
              height="220"
              cover
            />
            <v-card-item>
              <v-card-title>{{ cocktail.name }}</v-card-title>
              <v-card-subtitle class="d-flex flex-wrap" style="gap: 8px">
                <v-chip
                  size="small"
                  color="primary"
                  variant="tonal"
                  label
                >
                  難易度: {{ difficultyLabel(cocktail.difficulty) }}
                </v-chip>
                <v-chip size="small" color="secondary" variant="tonal" label>
                  アルコール: {{ alcoholLabel(cocktail.alcohol_level) }}
                </v-chip>
              </v-card-subtitle>
            </v-card-item>
            <v-card-text>
              <p class="text-body-2 mb-4">
                {{ cocktail.description }}
              </p>
              <div class="mb-4">
                <div class="text-subtitle-2 mb-2">材料</div>
                <v-list density="compact">
                  <v-list-item
                    v-for="ingredient in cocktail.ingredients"
                    :key="`${cocktail.id}-${ingredient.name}`"
                  >
                    <v-list-item-title>{{ ingredient.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ ingredient.amount }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </div>
              <div>
                <div class="text-subtitle-2 mb-2">作り方</div>
                <ol style="padding-left: 1.25rem">
                  <li v-for="(step, index) in cocktail.steps" :key="index">
                    {{ step }}
                  </li>
                </ol>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
