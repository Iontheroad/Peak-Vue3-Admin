<template>
  <div class="avatar">
    <el-avatar :size="size" :src="avatar" />
    <div class="avatar_text">
      <!-- <div>早安, {{ userStore.userInfo.nickname }}, 又是元气满满的一天!</div> -->
      <div>{{ greeting }}</div>
      <div>{{ time }}</div>
    </div>
    <!-- <div class="tip">
      <p>早安，{{ userStore.userName }}，开始您一天的工作吧！</p>
      <p>今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="Avatar">
import avatar from "@/assets/images/avatar.jpg";
import { getGreeting } from "./avatar";
// import dayjs from "dayjs";
// import { dayjs } from "element-plus";
import { computed, ref, toRefs } from "vue";
import { useUserStore } from "@/store/modules/user";
const userStore = useUserStore();
const props = withDefaults(defineProps<{ size: number }>(), {
  size: 50,
});
let { size } = toRefs(props);

// 根据当前时间段,显示不同招呼语
let greeting = computed((): string => {
  return getGreeting();
});

/**
 * 获取现在的时间
 */
const getTime = () => {
  // const weekList = ["日", "一", "二", "三", "四", "五", "六"];
  // return `${dayjs(new Date()).format("YYYY年MM月DD日 HH:mm:ss")} 星期${
  //   weekList[dayjs(new Date()).day()]
  // }`;

  // 原生写法
  let time = new Date();
  let year = time.getFullYear();
  let month = String(time.getMonth() + 1).padStart(2, "0");
  let date = String(time.getDate()).padStart(2, "0");
  let hours = String(time.getHours()).padStart(2, "0");
  let minutes = String(time.getMinutes()).padStart(2, "0");
  let seconds = String(time.getSeconds()).padStart(2, "0");
  let week = ["日", "一", "二", "三", "四", "五", "六"];
  let day = week[time.getDay()];
  return `${year}年${month}月${date}日 ${hours}:${minutes}:${seconds} 星期${day}`;
};

/**
 * 初始化
 */
let time = ref("");
const initTime = () => {
  time.value = getTime();
  setInterval(() => {
    time.value = getTime();
  }, 1000);
};

initTime();
</script>

<style scoped lang="scss">
.avatar {
  display: flex;
  align-items: center;
  .avatar_text {
    margin-left: 7px;
    div {
      line-height: 22px;
    }
    div:first-child {
      font-weight: 600;
    }
    div:nth-of-type(2) {
      font-size: 12px;
      color: #909399;
    }
  }
}
</style>
