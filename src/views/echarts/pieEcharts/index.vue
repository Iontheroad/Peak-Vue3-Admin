<script setup lang="ts" name="PieEcharts">
import * as echarts from "echarts";
import { onMounted, ref } from "vue";
import { useEcharts } from "@/hooks/useEcharts";
let pieOneRef = ref<HTMLElement | null>();
let option = {
  // 标题组件
  title: {
    text: "饼图",
    textStyle: {
      // color: '#fff',
      fontSize: 16,
    },
    padding: 0,
    top: 5,
    left: "center",
  },
  // color: [],
  // 图列组件
  legend: {
    // orient: "vertical", // 方向
    icon: "circle", //图例形状
    padding: 0,
    top: "4%",
    right: "center",
    itemWidth: 14, //小圆点宽度
    itemHeight: 14, // 小圆点高度
    itemGap: 15, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
    textStyle: {
      fontSize: 14, // 默认12
      // color: "#ffffff",
    },
  },
  //  提示框组件
  tooltip: {
    show: true, // 默认显示 提示框
    trigger: "item", // 悬停时触发项目，焦点变化时焦点变化
    formatter: "{b}:{d}%", // 用于在工具提示字段中显示的格式化程序字符串
    // formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  // 工具栏组件
  toolbox: {
    show: true,
    orient: "horizontal",
    left: "right",
    top: "top",
    itemSize: 20, // icon 大小
    itemGap: 10, // icon 间距
    showTitle: true, // 鼠标hove icon时是否显示icon标题
    feature: {
      mark: { show: true },
      dataView: {
        // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
        show: true,
        title: "数据视图",
        readOnly: false, // 是否只读
        lang: ["数据视图", "关闭", "刷新"], // 编辑页面的展示
      },
      // magicType: {
      //   show: true,
      //   type: ["line", "bar", "stack", "tiled"],
      //   title: {
      //     line: "折线图",
      //     bar: "柱状图",
      //     stack: "堆叠图",
      //     tiled: "堆叠图",
      //   },
      // },
      restore: {
        // 配置项还原
        show: true,
        title: "还原",
      },
      saveAsImage: {
        // 保存图片
        type: "png",
        title: "保存图片",
        name: "", // 保存的文件名 默认使用标题
        show: true,
        // backgroundColor: "", //保存的背景颜色,默认白色
      },
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie", // 什么图
      center: ["50%", "50%"], //圆心的位置
      top: "2%", //单单指的饼图距离上面的距离，top越大饼图越小
      left: "0%", //单单指的饼图距离左面的距离，会改变饼图的大小
      radius: ["40%", "60%"], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
      avoidLabelOverlap: false, //做同心圆用到
      clockwise: true, // 顺时针排列
      startAngle: 160, //起始角度 影响不大
      // roseType: "radius", //area|radius
      itemStyle: {
        //每个扇形的设置
        borderRadius: 10,
        borderColor: "#fff", //扇形边框颜色
        borderWidth: 2, //扇形边框大小 要先给borderColor颜色 设置borderWidth才会有效果
      },
      // 高亮状态的扇区和标签样式
      emphasis: {
        scale: false, // 是否开启高亮后扇区的放大效果。
        scaleSize: 10, // 高亮后扇区的放大尺寸，在开启 emphasis.scale 后有效
        // 鼠标移入的字体样式
        label: {
          show: true,
          fontSize: 20,
          fontWeight: "bold",
        },
        //启用鼠标放上去放大效果
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      // 饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
      label: {
        show: true, //默认true显示饼图上的标签
        position: "outside", //inside（在饼图上显示）,outside(默认就会出现引导线) center
        // formatter: "{b}:{c}",
      },
      //只有设置了label:show=true;position=outside 设置labelLine才会有效
      labelLine: {
        show: true, //显示引导线
        length: 30, //连接饼图第1段线条的长度 length length2 不写自适应
        length2: 10, //链接饼图第2段线条长度
        smooth: true, //是否光滑连接线
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ].sort((a, b) => b.value - a.value), // 降序排列
    },
  ],
};

onMounted(() => {
  // 初始化
  let myChart = echarts.init(pieOneRef.value!, "dark");
  myChart.setOption(option);
  useEcharts(myChart, option);
});
</script>

<template>
  <div class="pie-echarts-container">
    <div id="pie_one" ref="pieOneRef"></div>
  </div>
</template>

<style scoped lang="scss">
.pie-echarts-container {
  padding: 20px;
  #pie_one {
    width: 100%;
    height: 800px;
  }
}
</style>
