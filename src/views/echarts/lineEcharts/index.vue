<script setup lang="ts" name="LineEcharts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { useEcharts } from "@/hooks/useEcharts";

const lineRef = ref<HTMLElement | null>(null);

let option = {
  color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
  title: {
    text: "折线图",
    left: "center",
    textStyle: {
      // color: "#fff",
      fontSize: 20,
    },
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross", // 指示器的线
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
  legend: {
    top: "4%",
    data: ["Line 1", "Line 2", "Line 3", "Line 4", "Line 5"],
  },
  toolbox: {
    feature: {
      dataView: {
        readOnly: false,
        title: "数据视图",
        lang: ["数据视图", "关闭", "刷新"],
      },
      magicType: {
        type: ["line", "bar", "stack"],
        title: {
          line: "折线图",
          bar: "柱状图",
          stack: "堆叠柱状图",
        },
      },
      dataZoom: {
        show: true,
        title: {
          zoom: "区域缩放",
          back: "区域缩放还原",
        },
      },
      restore: {
        title: "还原",
      },
      saveAsImage: {
        title: "",
        type: "png",
      },
    },
    tooltip: {
      // 和 option.tooltip 的配置项相同
      show: true,
      formatter: function (param: { title: string }) {
        return "<div>" + param.title + "</div>"; // 自定义的 DOM 结构
      },
      backgroundColor: "#222",
      textStyle: {
        fontSize: 12,
      },
      extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);", // 自定义的 CSS 样式
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    top: "10%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Line 1",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(128, 255, 165)",
          },
          {
            offset: 1,
            color: "rgb(1, 191, 236)",
          },
        ]),
      },
      emphasis: {
        focus: "series", // 高亮所在系列的所有图形
        // focus: "self",
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
    {
      name: "Line 2",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(0, 221, 255)",
          },
          {
            offset: 1,
            color: "rgb(77, 119, 255)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [120, 282, 111, 234, 220, 340, 310],
    },
    {
      name: "Line 3",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(55, 162, 255)",
          },
          {
            offset: 1,
            color: "rgb(116, 21, 219)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [320, 132, 201, 334, 190, 130, 220],
    },
    {
      name: "Line 4",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(255, 0, 135)",
          },
          {
            offset: 1,
            color: "rgb(135, 0, 157)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 402, 231, 134, 190, 230, 120],
    },
    {
      name: "Line 5",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      label: {
        show: true,
        position: "top",
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(255, 191, 0)",
          },
          {
            offset: 1,
            color: "rgb(224, 62, 76)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 302, 181, 234, 210, 290, 150],
    },
  ],
};

onMounted(() => {
  let myChart = echarts.init(lineRef.value!);
  option && myChart.setOption(option);
  useEcharts(myChart, option);
});
</script>

<template>
  <div class="line_echarts_container">
    <div id="line" ref="lineRef"></div>
  </div>
</template>

<style scoped lang="scss">
.line_echarts_container {
  padding: 20px;
  #line {
    width: 100%;
    height: 800px;
  }
}
</style>
