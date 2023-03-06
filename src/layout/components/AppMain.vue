<script setup lang="ts" name="AppMain"></script>

<template>
  <div class="app-main">
    <router-view name="default" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
      <!-- <transition name="router-fade" mode="out-in"> -->
      <!-- </transition> -->
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #fafafa;
}

/* 如果导航栏固定，视图就加一些上返内边距 */
.fixed-header + .app-main {
  padding-top: 50px;
}

/* 标签视图显示时的样式 */
.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }
  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
<!-- <style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style> -->
