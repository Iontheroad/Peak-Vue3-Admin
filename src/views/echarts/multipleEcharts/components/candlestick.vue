<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { EChartsType } from "echarts/core";
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
    data: ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"],
  },
  yAxis: {},
  series: [
    {
      type: "candlestick",
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
      ],
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
