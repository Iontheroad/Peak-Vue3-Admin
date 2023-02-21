<template>
  <div class="app-wrapper">
    <!-- 移动端点击展开导航会有遮罩层 -->
    <!-- <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    /> -->
    <!-- 左侧菜单导航 -->
    <Sidebar class="sidebar-container" />
    <!-- 右侧主体 -->
    <div class="main-container">
      <div :class="{ 'fixed-header': true }">
        <!-- 导航栏 -->
        <Navbar />
      </div>
      <!-- 主体 -->
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" name="Layout" setup>
import { AppMain, Navbar, Sidebar } from "./components";
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

/* 遮罩层 */
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

// 固定表头(导航栏nav)
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

// 收起侧边栏，导航栏宽度
.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

// 移导入声明只能在命名空间或模块的顶层使用动端，导航栏百分百宽
.mobile .fixed-header {
  width: 100%;
}
</style>
