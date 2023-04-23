<script setup lang="ts">
// Element Plus 语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { ElConfigProvider } from "element-plus";
import { computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "./store";
const globalStore = useGlobalStore();

// 初始化主题配置
const { initTheme } = useTheme();
// initTheme();

// 获取语言包
const locale = computed(() => {
  if (globalStore.language == "zh-cn") {
    return zhCn;
  } else if (globalStore.language == "en") {
    return en;
  }
});
</script>

<template>
  <el-config-provider :locale="locale" :size="globalStore.elementSize">
    <router-view> </router-view>
  </el-config-provider>
</template>

<style scoped></style>
