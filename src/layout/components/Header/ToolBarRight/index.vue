<template>
  <div class="header_tool_right">
    <div class="tools">
      <!-- 主题设置 -->
      <ThemeSetting />
      <!-- 中英互译 -->
      <Language />
    </div>
    <!-- 头像部分 -->
    <Avatar />
  </div>
</template>

<script setup lang="ts" name="ToolBarRight">
import Language from "./components/Language.vue";
import Avatar from "./components/Avatar.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
</script>

<style scoped lang="scss">
.header_tool_right {
  display: flex;
  height: 100%;
  align-items: center;
  .tools {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // margin: 0px 5px;
    & > div {
      margin: 0px 5px;
    }
  }
  // &:focus {
  //   outline: none;
  // }
}
</style>
