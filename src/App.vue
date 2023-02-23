<script setup lang="ts">
import { ElConfigProvider } from "element-plus";

import { useAppStore } from "@/store/modules/app";

// 获取系统语言
const appStore = useAppStore();
</script>

<template>
  <el-config-provider :locale="appStore.locale" :size="appStore.size">
    <router-view> </router-view>
  </el-config-provider>
</template>

<style scoped></style>
