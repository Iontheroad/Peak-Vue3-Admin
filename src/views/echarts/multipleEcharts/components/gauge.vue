<template>
  <div :id="id" :class="className" :style="{ height: height, width: width }" />
</template>
<script lang="ts" setup>
import * as echarts from "echarts";
import { EChartsType } from "echarts/core";
import { onBeforeUnmount, onMounted } from "vue";
import { useEcharts } from "@/hooks/useEcharts";
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
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%",
  },
  series: [
    {
      name: "Pressure",
      type: "gauge",
      detail: {
        formatter: "{value}",
      },
      data: [
        {
          value: 50,
          name: "SCORE",
        },
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
