<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs
        v-model="tabsActive"
        type="card"
        @tab-click="tabClick"
        @tab-remove="tabRemove"
      >
        <el-tab-pane
          v-for="item in tabsList"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="item.close"
        >
          <template #label>
            <el-icon
              class="tabs-icon"
              v-show="item.icon && themeConfig.isShowTabsIcon"
            >
              <SvgIcon :icon-name="item.icon" />
            </el-icon>
            {{ generateTitle(item.title) }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup lang="ts" name="Tabs">
import SvgIcon from "@/components/SvgIcon/index.vue";
import MoreButton from "./MoreButton.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { generateTitle } from "@/utils/i18n";

import { useTabsStore } from "@/store/modules/tabs";
import { usePermissionStore } from "@/store/modules/permission";
import { useGlobalStore } from "@/store";

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const permissionStore = usePermissionStore();
const tabsStore = useTabsStore();

const themeConfig = computed(() => globalStore.themeConfig);
const tabsList = computed(() => tabsStore.tabsList);
const tabsActive = ref(route.name); // 记录当前点击的

watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull || route.meta.isLink) return;
    //  HACK:由于mock的路由路径是相对路径, 暂时存储路由别名
    tabsActive.value = route.name;
    let tabsItem = {
      icon: route.meta.icon as string,
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      close: !route.meta.isAffix,
    };
    tabsStore.addTabs_actions(tabsItem);
  },
  {
    immediate: true, //
  }
);

onMounted(() => {
  initTabs();
});

/**
 * 初始化,先遍历出需要固定tab
 */
const initTabs = () => {
  permissionStore.flatMenubarList_getters.forEach((item) => {
    if (item.meta?.isAffix && !item.meta?.isHidden && !item.meta?.isFull) {
      let tabsItem = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name as string,
        close: !item.meta.isAffix,
      };
      tabsStore.addTabs_actions(tabsItem);
    }
  });
};

/**
 * 点击跳转
 */
const tabClick = (tabsItem: { props: { name: string } }) => {
  router.push({ name: tabsItem.props.name });
};

/**
 * 点击删除
 * @param -暂时用路由别名
 */
const tabRemove = (routeName: string) => {
  let name = tabsStore.tabsList.find((item) => item.name == routeName);
  name && tabsStore.removeTabs_actions(routeName, routeName == route.name);
};
</script>

<style scoped lang="scss">
.tabs-box {
  background-color: #ffffff;
  :deep(.tabs-menu) {
    position: relative;
    width: 100%;
    .el-dropdown {
      position: absolute;
      top: 8px;
      right: 13px;
    }
    .tabs-icon {
      top: 2px;
      font-size: 15px;
    }
    .el-tabs__nav-wrap {
      position: absolute;
      width: calc(100% - 110px);
    }
    .el-tabs--card > .el-tabs__header {
      box-sizing: border-box;
      height: 40px;
      padding: 0 10px;
      margin: 0;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item {
      color: #cccccc;
      border: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
      color: var(--el-color-primary);
      border-bottom: 2px solid var(--el-color-primary);
    }
    .el-tabs__item .is-icon-close svg {
      margin-top: 0.5px;
    }
  }
}
</style>
