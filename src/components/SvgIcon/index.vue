<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed } from "vue";

interface SvgProps {
  prefix?: string;
  iconName: string;
}

// const props = defineProps<SvgProps>();
const props = defineProps({
  // 图标的前缀 ==> 非必填（默认为 “icon”）
  prefix: {
    type: String,
    default: "icon",
  },

  // 图标的名称 ==> 必传
  iconName: {
    type: String,
    required: true,
  },

  /*
  remove （默认值）
    在动画的激活持续时间结束后，动画效果会移除（不再应用）。在动画的激活结束后，动画不再对目标元素有影响（除非动画重新开始）。
  freeze
    在动画激活持续时间结束后，文档持续时间的剩余时间里（或者直到动画重新开始）动画效果会“冻结”着。
  */
  color: {
    type: String,
    default: "",
  },
});

// svg 名称
const symbolId = computed(() => `#${props.prefix}-${props.iconName}`);
// console.log(symbolId);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
