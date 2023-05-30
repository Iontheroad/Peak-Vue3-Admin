<template>
  <div class="header_tool_left">
    <!-- 点击展开收起的按钮 -->
    <Hamburger />
    <!-- 面包屑,在移动端状态下不显示 -->
    <Breadcrumb v-if="device != 'mobile' && themeConfig.isShowBreadcrumb" />
  </div>
</template>

<script setup lang="ts" name="ToolBarLeft">
import Breadcrumb from "./components/Breadcrumb.vue";
import Hamburger from "./components/Hamburger.vue";
import { useGlobalStore } from "@/store";
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

const appStore = useAppStore();
const device = computed(() => appStore.device); // 设备
</script>

<style scoped lang="scss">
.header_tool_left {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
