<template>
  <div class="home-container">
    <el-row class="myRow">
      <el-col :span="24">
        <el-card class="box-card">
          <Avatar :size="60" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="myRow">
      <el-col class="myCol" :xs="24" :sm="10" :lg="10">
        <el-space :fill="true" direction="vertical" :size="10">
          <!-- 技术栈 -->
          <TechnologyStack />
          <!-- 留言板 -->
          <MessageBoard />
        </el-space>
      </el-col>
      <el-col class="myCol" :xs="24" :sm="14" :lg="14">
        <!-- 快捷导航 -->
        <QuickNav />
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts" name="Dashboard">
import {} from "@element-plus/icons-vue";

import Avatar from "./components/Avatar.vue";
import TechnologyStack from "./components/TechnologyStack.vue";
import MessageBoard from "./components/MessageBoard.vue";
import QuickNav from "./components/QuickNav.vue";
</script>

<style scoped lang="scss">
.home-container {
  .myRow,
  .myCol {
    margin-bottom: 10px;
  }
}
</style>
