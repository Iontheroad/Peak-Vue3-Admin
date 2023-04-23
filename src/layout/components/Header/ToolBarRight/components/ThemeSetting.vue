<template>
  <div class="theme-setting">
    <el-icon
      :class="'iconfont icon-zhuti'"
      class="toolBar-icon"
      @click="openDrawer"
      ><Tools
    /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { Tools } from "@element-plus/icons-vue";
import mittBus from "@/utils/mittBus";
const openDrawer = () => {
  mittBus.emit("openThemeDrawer");
};
</script>
