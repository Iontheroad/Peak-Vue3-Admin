<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
// import { storeToRefs } from "pinia";

import SidebarItem from "./SidebarItem.vue";
import Logo from "./Logo.vue";

import variables from "@/styles/variables.module.scss";
import { usePermissionStore } from "@/store/modules/permission";
import { useAppStore } from "@/store/modules/app";
import { useGlobalStore } from "@/store/index";

const permissionStore = usePermissionStore(); // 权限路由状态仓库
const appStore = useAppStore();
const globalStore = useGlobalStore();
const route = useRoute();

const isShowLogo = computed(() => globalStore.themeConfig.isShowLogo); // Logo是否显示
const isCollapse = computed(() => !appStore.sidebar.opened); //是否折叠菜单

/* 高亮所设置的指定菜单 */
const activeMenu = computed<string>(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) {
    return meta.activeMenu as string;
  }
  return path;
});
</script>

<template>
  <!-- has-logo类： 当logo显示就会腾出高度给logo -->
  <div :class="{ 'has-logo': isShowLogo }">
    <!-- 是否显示Logo组件，默认不显示 -->
    <logo v-if="isShowLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!--  :collapse="isCollapse" 是否折叠菜单 -->
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
        <sidebar-item
          v-for="route in permissionStore.menubarList_getters"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
