<template>
  <el-drawer v-model="drawerVisible" title="布局设置" size="300px">
    <!-- 全局主题 -->
    <el-divider class="divider" content-position="center">
      <el-icon><ColdDrink /></el-icon>
      全局主题
    </el-divider>
    <div class="theme-item">
      <span>主题颜色</span>
      <el-color-picker
        v-model="themeConfig.primary"
        :predefine="colorList"
        @change="changePrimary"
      />
    </div>
    <br />

    <!-- 界面设置 -->
    <!-- <el-divider class="divider" content-position="center">
      <el-icon><Setting /></el-icon>
      界面设置
    </el-divider>
    <div class="theme-item">
      <span>折叠菜单</span>
      <el-switch v-model="themeConfig.isCollapse" />
    </div>
    <div class="theme-item">
      <span>面包屑</span>
      <el-switch v-model="themeConfig.breadcrumb" />
    </div>
    <div class="theme-item">
      <span>面包屑图标</span>
      <el-switch v-model="themeConfig.breadcrumbIcon" />
    </div>
    <div class="theme-item">
      <span>标签栏</span>
      <el-switch v-model="themeConfig.tabs" />
    </div>
    <div class="theme-item">
      <span>标签栏图标</span>
      <el-switch v-model="themeConfig.tabsIcon" />
    </div>
    <div class="theme-item">
      <span>页脚</span>
      <el-switch v-model="themeConfig.footer" />
    </div> -->
  </el-drawer>
</template>

<script setup lang="ts">
import { ColdDrink } from "@element-plus/icons-vue";
import { ref, computed, watch } from "vue";
import { useTheme } from "@/hooks/useTheme";
import { useGlobalStore } from "@/store/index";
import { DEFAULT_PRIMARY } from "@/config/config";
import SwitchDark from "@/components/SwitchDark/index.vue";
import mittBus from "@/utils/mittBus";

const { changePrimary } = useTheme();

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  "#DAA96E",
  "#0C819F",
  "#409EFF",
  "#27ae60",
  "#ff5c93",
  "#e74c3c",
  "#fd726d",
  "#f39c12",
  "#9b59b6",
];

const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on("openThemeDrawer", () => (drawerVisible.value = true));
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
