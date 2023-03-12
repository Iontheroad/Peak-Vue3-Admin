<script setup lang="ts" name="MobileMask">
import { useAppStore } from "@/store/modules/app";
import { computed } from "vue";
const appStore = useAppStore();

const sidebar = computed(() => appStore.sidebar);
// pc：desktop    移动：mobile 窗口宽度小于992
const device = computed(() => appStore.device);

/**
 * 点击空白处，移除遮罩层，并收起菜单
 */
function handleClickOutside() {
  console.log("kkk");

  appStore.closeSideBar(false);
}
</script>

<template>
  <div
    v-if="device == 'mobile' && sidebar.opened"
    class="drawer-bg"
    @click="handleClickOutside"
  />
</template>

<style scoped>
/* 遮罩层 */
.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}
</style>
