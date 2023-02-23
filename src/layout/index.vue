<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 移动端点击展开导航会有遮罩层 -->
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 左侧菜单导航 -->
    <sidebar class="sidebar-container" />
    <!-- 右侧主体 -->
    <div :class="{ haTagsView: isShowTagsView }" class="main-container">
      <div :class="{ 'fixed-header': isFixedHeader }">
        <!-- 导航栏 -->
        <Navbar />
      </div>
      <!-- 主页面 -->
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts" setup name="Layout">
// api
import { computed, watch, onBeforeMount, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
// 组件
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain.vue";
// store
import { useGlobalStore } from "@/store/index";
import { useAppStore } from "@/store/modules/app";

const route = useRoute();
const globalStore = useGlobalStore();
const appStore = useAppStore();

const sidebar = computed(() => appStore.sidebar);
// pc：desktop    移动：mobile 窗口宽度小于992
const device = computed(() => appStore.device);

const isFixedHeader = computed(() => globalStore.themeConfig.isFixedHeader); // 是否固定表头
const isShowTagsView = computed(() => globalStore.themeConfig.isShowTagsView); // 是否显示标签视图

// 菜单栏的展开收起隐藏的一些样式
const classObj = computed(() => {
  return {
    // 收起侧边栏
    hideSidebar: !sidebar.value.opened,
    // 打开侧边栏
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === "mobile", // 移动端
  };
});

/**
 * 点击空白处，移除遮罩层，并收起菜单
 */
function handleClickOutside() {
  appStore.closeSideBar(false);
}

// 监听路由
watch(route, () => {
  if (device.value == "mobile" && sidebar.value.opened) {
    appStore.closeSideBar(false);
  }
});
onBeforeMount(() => {
  window.addEventListener("resize", $_resizeHandler);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", $_resizeHandler);
});

// 判断窗口大小
const { body } = document;
// const html = document.documentElement;
const WIDTH = 992; //
function $_isWidth() {
  /*
      top: 元素上边距离页面上边的距离浏览器
      left: 元素右边距离页面左边的距离bash
      right: 元素右边距离页面左边的距离markdown
      bottom: 元素下边距离页面上边的距离
      width: 元素宽度
      height: 元素高度
      */
  const rect = body.getBoundingClientRect();
  return rect.width;
}
// 监听屏幕宽度
function $_resizeHandler() {
  // 我们需要在特定的时候判断页面的显示状态，例如：当视频加载到可播放状态时，根据用户是否停留在当前页面来决定是否开始自动播放。页面的展示的状态的判断就需要用到html5新增的一个api：document.hidden。
  // bool型，表示页面是否处于隐藏状态。页面隐藏包括页面在后台标签页或者浏览器最小化。
  // 确保页面状态

  if (!document.hidden) {
    const isMobile = $_isWidth();
    if (isMobile < WIDTH) {
      // 小于992调成移动设备
      appStore.toggleDevice("mobile");
      // 关闭菜单
      appStore.closeSideBar(false);
    } else {
      // pc端
      appStore.toggleDevice("desktop");
      if (isMobile >= 1200) {
        //大于1200，展开
        appStore.openSideBar(false);
      } else {
        // 收起
        appStore.closeSideBar(false);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

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

  /* 固定表头(导航栏nav) */
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  /* 收起侧边栏，导航栏宽度 */
  &.hideSidebar .fixed-header {
    width: calc(100% - 54px);
  }

  /* 移动端状态下 */
  &.mobile {
    // 移动端打开侧边栏
    &.openSidebar {
      position: fixed;
      top: 0;
    }
    //  移动端，导航栏百分百宽
    .fixed-header {
      width: 100%;
    }
  }
}
</style>
