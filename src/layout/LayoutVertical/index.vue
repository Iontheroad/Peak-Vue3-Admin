<template>
  <el-container class="layout_container" :class="classObj">
    <!-- 移动端遮罩层 -->
    <MobileMask />
    <el-aside
      class="layout_menu"
      :class="{ 'has-logo': themeConfig.isShowLogo }"
    >
      <!-- 是否显示Logo组件，默认不显示 -->
      <Logo v-if="themeConfig.isShowLogo" :collapse="isCollapse" />
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="variables.menuBg"
          :text-color="variables.menuText"
          :active-text-color="variables.menuActiveText"
          :unique-opened="false"
          :collapse-transition="false"
          mode="vertical"
        >
          <!-- 每一项菜单 -->
          <SubMenu
            v-for="route in permissionStore.menubarList_getters"
            :item="route"
            :key="route.path"
            :base-path="route.path"
          />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="layout_main">
      <!-- 头部 -->
      <el-header
        class="header_container"
        :class="{
          'fixed-header': themeConfig.isFixedHeader,
          isShowTabsView: themeConfig.isShowTabsView,
        }"
      >
        <div class="header-tools">
          <!-- 头部左侧工具栏 -->
          <ToolBarLeft />
          <!-- 右侧 -->
          <ToolBarRight />
        </div>
        <Tabs v-if="themeConfig.isShowTabsView" />
      </el-header>
      <!-- 视图区域 -->
      <Main />
      <el-footer class="layout_footer"><Footer /></el-footer>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="LayoutVertical">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import variables from "@/styles/variables.module.scss";
// 组件
import MobileMask from "@/layout/components/MobileMask.vue";
import Logo from "@/layout/components/Menu/Logo.vue";
import SubMenu from "@/layout/components/Menu/SubMenu.vue";
import ToolBarLeft from "@/layout/components/Header/ToolBarLeft/index.vue";
import ToolBarRight from "@/layout/components/Header/ToolBarRight/index.vue";
import Tabs from "@/layout/components/Header/Tabs/index.vue";
import Main from "@/layout/components/Main/index.vue";
import Footer from "@/layout/components/Footer/index.vue";
// store
import { useAppStore } from "@/store/modules/app";
import { usePermissionStore } from "@/store/modules/permission";
import { useGlobalStore } from "@/store/index";
const route = useRoute();
const appStore = useAppStore();
const globalStore = useGlobalStore();
const permissionStore = usePermissionStore(); // 权限路由状态仓库

const sidebar = computed(() => appStore.sidebar);
// pc：desktop    移动：mobile 窗口宽度小于992
const device = computed(() => appStore.device);
const isCollapse = computed(() => !appStore.sidebar.opened); //是否折叠菜单
const themeConfig = computed(() => globalStore.themeConfig);

/* 高亮所设置的指定菜单 */
const activeMenu = computed<string>(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
/* 在mobile情况下,路由跳转后关闭菜单栏 */
watch(route, () => {
  if (device.value == "mobile" && sidebar.value.opened) {
    appStore.closeSideBar(false);
  }
});
/**
 * 根据菜单栏的展开/半收起/隐藏状态 动态添加样式类
 */
const classObj = computed(() => {
  return {
    // 收起侧边栏
    hideSidebar: !sidebar.value.opened,
    // 打开侧边栏
    openSidebar: sidebar.value.opened,
    // 动画
    withoutAnimation: sidebar.value.withoutAnimation,
    // 移动端
    mobile: device.value === "mobile", // 移动端
  };
});
</script>

<style lang="scss">
@import "@/styles/mixin.scss";
@import "@/styles/variables.module.scss";
@import "./index.scss";
.layout_container {
  @include clearfix;
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  // 主体
  .layout_main {
    position: relative;
    height: 100%;
    // 右侧的外边距的大小就是菜单栏的宽度
    margin-left: $sideBarWidth;
    // 菜单栏收起添加一个左外边距的过度
    transition: margin-left 0.28s;

    /* 头部 */
    .header_container {
      position: relative;
      height: 50px; // 导航栏高度
      // overflow: hidden;
      padding: 0px;
      background-color: #fff;
      // 头部工具
      .header-tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
        border-bottom: 1px solid #f1f1f1;
      }
      // 固定表头(header导航栏)
      &.fixed-header {
        position: fixed;
        right: 0px;
        z-index: 9;
        transition: width 0.28s;
        width: calc(100% - $sideBarWidth);
        // Header固定时, 视图区域空出Header高度的上外边距
        & + .main {
          // 原有的10 + 头部高度50
          padding-top: 60px;
          overflow: auto;
        }
      }

      // 标签视图显示时： 视图区域的高度，以及固定时的上外边距
      &.isShowTabsView {
        height: 90px; // 头部高度为90
        // .main {
        //   min-height: calc(100vh - 84px);
        // }
        &.fixed-header + .main {
          padding-top: 100px;
        }
      }
    }

    /* 尾部 */
    .layout_footer {
      position: fixed;
      bottom: 0px;
      right: 0px;
      width: calc(100% - $sideBarWidth);
      height: auto;
      padding: 0px;
      transition: width 0.28s;
    }
  }
}
</style>
