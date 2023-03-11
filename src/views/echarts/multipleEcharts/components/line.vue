<template>
  <div
    :id="id"
    :class="className"
    :style="{ height: height, width: width }"
    ref="chartsRef"
  />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { EChartsType } from "echarts/core";
import { useEcharts } from "@/hooks/useEcharts";
import { onBeforeUnmount, onMounted, ref } from "vue";
const chartsRef = ref<HTMLElement | null>();

const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  xAxisData: {
    type: Array,
    default: () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  config: {
    type: Object,
    default: () => {},
  },
  seriesData: {
    type: Array,
    default: () => [150, 230, 224, 218, 135, 147, 260],
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
    data: props.xAxisData,
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: props.seriesData,
      type: "line",
    },
  ],
  ...props.config,
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

<style></style>
