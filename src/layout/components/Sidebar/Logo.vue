<template>
  <!-- 此处class类(collapse) 用于清除 收起时图标的右侧外边距 -->
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
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
  collapse: boolean; //
}>();

let title = ref("Vue Admin Template");
// let logo = ref(
//   "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png"
// );
const logo = ref<string>(
  new URL(`../../../assets/logo.png`, import.meta.url).href
);
// console.log(logos);
</script>

<style lang="scss" scoped>
// 只需进入动画
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
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

  // 收起时
  &.collapse {
    .sidebar-logo {
      //  收起时 取消右边距
      margin-right: 0px;
    }
  }
}
</style>
