<template>
  <!-- 此处class类(collapse) 用于清除 收起时logo的右侧外边距 -->
  <div class="logo_container" :class="{ collapse: collapse }">
    <!-- 动画 -->
    <transition name="sidebarLogoFade">
      <!-- 收起 -->
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 v-else class="sidebar-title">{{ title }}</h1>
      </router-link>
      <!-- 展开 -->
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts" name="Logo">
import { ref } from "vue";
defineProps<{
  collapse: boolean;
}>();

let title = ref("Peak Vue3 Admin");
const logo = ref<string>(
  new URL(`@/assets/peak_logo.png`, import.meta.url).href
);
</script>

<style lang="scss" scoped>
.logo_container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  /*只需给刚进入和离开之后添加动画即可 */
  .sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
  }
  .sidebarLogoFade-enter,
  .sidebarLogoFade-leave-to {
    opacity: 0;
  }

  /* Logo容器 */
  .sidebar-logo-link {
    width: 100%;
    height: 100%;

    // logo大小
    .sidebar-logo {
      width: 25px;
      height: 25px;
      vertical-align: middle;
      margin-right: 12px;
    }
    // logo 标题文字
    .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  // 收起时不显示title
  &.collapse {
    .sidebar-logo {
      //  收起时 取消logo右边距
      margin-right: 0px;
    }
  }
}
</style>
