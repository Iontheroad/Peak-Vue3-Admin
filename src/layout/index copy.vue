<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <button @click="click_logout">退出登录</button>
        </el-header>
        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore(); // 用户状态仓库
const router = useRouter();

const click_logout = async () => {
  try {
    let result = await userStore.logout_actions();
    ElMessage.success({
      showClose: true,
      message: "退出成功",
    });
    router.replace("/login");
  } catch (error) {
    ElMessage({
      showClose: true,
      message: "退出失败",
      type: "error",
    });
  }
};
</script>

<style scoped></style>
