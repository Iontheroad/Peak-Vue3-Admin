<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup name="MultipleBar">
import * as echarts from "echarts";
// import { EChartsType } from "echarts/core";
import { useEcharts } from "@/hooks/useEcharts";
import { onBeforeUnmount, onMounted } from "vue";

let props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  config: {
    type: Object,
    default: () => {},
  },
  id: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "200px",
  },
  height: {
    type: String,
    default: "200px",
  },
});
const options = {
  grid: {
    top: 10,
    left: "2%",
    right: "2%",
    bottom: "2%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
      "星期日",
    ],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
};
let charts: echarts.ECharts;
const initChart = () => {
  let chart = echarts.init(document.getElementById(props.id)!);
  chart.setOption(options);
  return chart;
};
function resizeFun() {
  window.addEventListener("resize", function () {
    charts && charts.resize();
  });
}
onMounted(() => {
  charts = initChart();
  resizeFun();
  useEcharts(charts, options);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeFun);
});
</script>
