<script setup lang="ts">
const { materials, materialCategories, fetchMaterials, fetchMaterialCategory } =
  useMaterial();
const { userMaterials, toggleUserMaterial } = useUserMaterial();

const selectedMaterials = ref<string[]>([]);

watch(userMaterials, () => {
  selectedMaterials.value = userMaterials.value.map((x) => x.material_id);
});

onMounted(async () => {
  // TODO: app.vueでのみ取得で良さそう
  await fetchMaterials();
  await fetchMaterialCategory();
  selectedMaterials.value = userMaterials.value.map((x) => x.material_id);
});

const onClickMaterial = (materialId: string) => {
  toggleUserMaterial(materialId);
};
</script>
<template>
  <div>
    <h1>ユーザー材料管理</h1>
    <v-chip-group
      v-model="selectedMaterials"
      selected-class="text-primary"
      column
      multiple
    >
      <div
        v-for="materialCategory in materialCategories"
        :key="materialCategory.id"
        style="width: 100%; padding-bottom: 10px"
      >
        <div>
          {{ materialCategory.name }}
        </div>
        <v-chip
          v-for="material in materials.filter(
            (x) => x.category_id === materialCategory.id
          )"
          :key="material.id"
          :text="material.name"
          :value="material.id"
          variant="outlined"
          filter
          @click="onClickMaterial(material.id)"
        />
      </div>
    </v-chip-group>
  </div>
</template>
