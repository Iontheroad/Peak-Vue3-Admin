<script lang="ts" setup name="Navbar">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { CaretBottom } from "@element-plus/icons-vue";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
import Hamburger from "@/components/Hamburger/index.vue";
import Language from "./Header/Language.vue";

import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
const router = useRouter();
const appStore = useAppStore();
const userStore = useUserStore();

const sidebar = computed(() => appStore.sidebar); // 菜单栏状态
const avatar = computed(() => userStore.userInfo.avatar); // 头像

/**
 * 点击展开收起状态栏
 */
function toggleSideBar() {
  appStore.toggleSidebar(false);
}

/**
 * 点击退出登录
 */
function click_logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await userStore.logout_actions();
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
    })
    .catch(() => {
      ElMessage.info({
        showClose: true,
        message: "取消退出",
      });
    });
}
</script>

<template>
  <div class="navbar">
    <div class="left-menu">
      <!-- 点击展开收起的按钮 -->
      <Hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <!-- 面包屑 -->
      <Breadcrumb class="breadcrumb-container" />
    </div>
    <!-- 右侧 -->
    <div class="right-menu">
      <!-- 中英互译 -->
      <Language />
      <!-- 头像部分 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <!-- <i class="el-icon-caret-bottom" /> -->
          <!-- <CaretBottom class="user-avatar-icon" /> -->
          <span>Peak<CaretBottom class="user-avatar-icon" /></span>
        </div>
        <template #dropdown>
          <!-- 点击下拉 -->
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <!-- 回首页 -->
            <router-link to="/">
              <el-dropdown-item>Home</el-dropdown-item>
            </router-link>
            <!-- GitHub -->
            <a
              target="_blank"
              href="https://github.com/Iontheroad/Peak-Vue3-admin"
            >
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <!-- Gitee -->
            <a
              target="_blank"
              href="https://gitee.com/Zhangpeak/Peak-Vue3-Admin"
            >
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <!-- 项目文档 -->
            <!-- <a
              target="_blank"
              href="https://panjiachen.github.io/vue-element-admin-site/#/"
            >
              <el-dropdown-item>Docs</el-dropdown-item>
            </a> -->
            <!-- 退出登录 -->
            <el-dropdown-item divided @click.native="click_logout">
              <span style="display: block">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px; // 导航栏高度
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  /* 点击展开导航栏的按钮 */
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s; // 动画
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  /* 面包屑 */
  // .breadcrumb-container {
  //   // float: left;
  // }

  /* 右侧*/
  .right-menu {
    display: flex;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    // 头像
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;
        // margin-top: 5px;
        cursor: pointer;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        > span {
          display: inline-block;
          margin-left: 5px;
        }
        // 小图标
        .user-avatar-icon {
          width: 15px;
          height: 15px;
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
