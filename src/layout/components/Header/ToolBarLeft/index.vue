<template>
  <div class="header_tool_left">
    <!-- 点击展开收起的按钮 -->
    <Hamburger :is-active="sidebar.opened" @toggleClick="toggleSideBar" />
    <!-- 面包屑 -->
    <Breadcrumb v-if="device != 'mobile'" />
  </div>
</template>

<script setup lang="ts" name="ToolBarLeft">
import Breadcrumb from "./components/Breadcrumb.vue";
import Hamburger from "./components/Hamburger.vue";
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
const sidebar = computed(() => appStore.sidebar); // 菜单栏状态
const device = computed(() => appStore.device); //

/**
 * 点击展开收起状态栏，的回调
 */
const appStore = useAppStore();
function toggleSideBar() {
  appStore.toggleSidebar(false);
}
</script>

<style scoped lang="scss">
.header_tool_left {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
