<template>
  <div ref="topCardItemRefs"></div>
</template>

<script setup lang="ts" name="CountUp">
import { onMounted, nextTick, ref, watch, computed } from "vue";
import { CountUp } from "countup.js"; // https://github.com/inorganik/countUp.js#readme

const props = withDefaults(
  defineProps<{
    countUp: number | ""; // 传入的数据
    prefix?: string; // 前缀
    duration?: number; // 秒
  }>(),
  {
    duration: 1,
    prefix: "",
  }
);
// 定义变量内容
const topCardItemRefs = ref<HTMLDivElement>();
let countUp = computed(() => Number(props.countUp) || 0);
watch(
  () => props.countUp,
  () => {
    initNumCountUp();
  }
);

// 初始化数字滚动
const initNumCountUp = () => {
  nextTick(() => {
    new CountUp(topCardItemRefs.value as HTMLDivElement, countUp.value, {
      startVal: 0,
      duration: 1, // 秒
      prefix: props.prefix,
    }).start();
  });
};
// 重置/刷新数值
const refreshCurrent = () => {
  initNumCountUp();
};
// 页面加载时
onMounted(() => {
  initNumCountUp();
});
</script>
