<template>
  <component :is="isLayout[themeConfig.layout]"></component>
</template>

<script setup lang="ts" name="Layout">
import { useGlobalStore } from "@/store";
import { computed, defineAsyncComponent, reactive, type Component } from "vue";

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const isLayout: { [key: string]: Component } = {
  vertical: defineAsyncComponent(
    () => import("@/layout/LayoutVertical/index.vue")
  ),
};
</script>

<style scoped></style>
