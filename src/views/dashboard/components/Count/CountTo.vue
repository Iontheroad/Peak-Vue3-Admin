<script setup lang="ts" name="CountTo">
import { computed, ref, toRefs, watch } from "vue";
import { useTransition } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    baseNumber: number | ""; // 传入的数据
    duration?: number; // 动画时间
    prefix?: string; // 前缀
    toFixedNum?: number; // 保留几位小数
    isComma?: boolean; // 是否每三位加一个逗号
  }>(),
  {
    duration: 500,
    prefix: "",
    toFixedNum: 0,
    isComma: true,
  }
);
// let { baseNumber, duration, prefix, toFixedNum } = toRefs(props);

let countTo = ref(0);
const cubicBezierNumber = useTransition(countTo, {
  duration: props.duration,
});

// 监听传入的数据,修改number的值
watch(
  () => props.baseNumber,
  (newVal) => {
    countTo.value = Number(newVal) || 0;
  },
  {
    immediate: true, // 先自执行一次
  }
);

/*
这个正则表达式的含义是：匹配到每个数字之间的位置，即后面跟着任意个三个数字的整数倍，且后面不再有数字的位置，用于对数字中的每三位之间加上逗号。

具体解释如下：

\B 表示匹配非单词边界的位置，避免将数字中间的逗号替换掉；
(?=(\d{3})+(?!\d)) 表示一个正向零宽断言，匹配到每个数字之间的位置，即后面跟着任意个三个数字的整数倍，且后面不再有数字的位置，用于匹配到每三个数字之间的位置；
(\d{3})+ 表示匹配三个数字的整数倍，加上 + 表示匹配多个三个数字的整数倍；
(?!\d) 表示一个负向零宽断言，用于确保后面不再有数字，避免将数字后面的逗号也替换掉。
总的来说，这个正则表达式就是用于匹配到数字中每三位之间的位置，将其替换为逗号。
*/
const formattingCount = computed(() => {
  let count: number | string = cubicBezierNumber.value;
  // 保留几位小数, // 必须要加,不然动画过度跳动
  count = (count as number).toFixed(props.toFixedNum);
  //  是否每三位加一个 逗号
  if (props.isComma)
    count = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //  前缀
  props.prefix && (count = props.prefix + count);
  return count;
});
</script>

<template>
  {{ formattingCount }}
</template>
