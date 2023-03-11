<script setup lang="ts" name="PieEcharts">
import * as echarts from "echarts";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useEcharts } from "@/hooks/useEcharts";
let pieOneRef = ref<HTMLElement | null>();
let title = ref("饼图-折线图-柱状图-动态切换");
let dataList = ref(
  [
    { value: 1048, name: "Search Engine" },
    { value: 735, name: "Direct" },
    { value: 580, name: "Email" },
    { value: 484, name: "Union Ads" },
    { value: 300, name: "Video Ads" },
  ].sort((a, b) => b.value - a.value)
);
let option = ref({});

let options = {
  // 标题组件
  title: {
    text: "俺是标题",
    textStyle: {
      // color: '#fff',
      fontSize: 16,
    },
    padding: 0,
    top: 5,
    left: "center",
  },
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
      magicType: {
        show: true,
        type: ["line", "bar", "stack", "tiled"],
        title: {
          line: "折线图",
          bar: "柱状图",
          stack: "堆叠图",
          tiled: "堆叠图",
        },
      },
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
        scale: false,
        scaleSize: 10,
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
      // 拼图标签
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

function pieData() {
  option.value = {
    // 标题组件
    title: {
      ...options.title,
      text: title.value,
    },
    // 图列组件
    legend: {
      icon: "circle",
      top: "4%",
      left: "center",
      itemWidth: 8,
      itemHeight: 8,
      itemGep: 20,
      textStyle: {
        // padding: 4,
        rich: {
          a: {
            color: "#969AA8",
            lineHeight: 30,
            fontSize: 14,
            width: 90,
          },
          b: {
            fontSize: 14,
            fontWeight: "bolder",
            color: "#000",
          },
        },
      },
      data: dataList.value,
      formatter: function (name: string) {
        let total = 0;
        let target;
        for (let i = 0, l = dataList.value.length; i < l; i++) {
          total += dataList.value[i].value;
          if (dataList.value[i].name == name) {
            target = dataList.value[i].value;
          }
        }
        let nameResult = name.length > 6 ? name.slice(0, 6) + "..." : name;
        return (
          "{b|" +
          (((target as number) / total) * 100).toFixed(2) +
          "%}\n{a|" +
          nameResult +
          "}"
        );
      },
    },
    //  提示框组件
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    // color: ["#007950", "#0097AF", "#376BB9", "#DF993E", "#AD475F"],
    // 工具栏组件
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { readOnly: false },
        myPie: {
          show: true,
          title: "切换为饼状图",
          icon: "path://M512 98.304C282.624 98.304 98.304 282.624 98.304 512s184.32 413.696 413.696 413.696c229.376 0 413.696-184.32 413.696-413.696S741.376 98.304 512 98.304zM888.832 491.52l-331.776 0 233.472-233.472C847.872 323.584 884.736 401.408 888.832 491.52zM512 888.832c-208.896 0-376.832-167.936-376.832-376.832 0-208.896 167.936-376.832 376.832-376.832 98.304 0 184.32 36.864 253.952 98.304l-266.24 266.24c-4.096 4.096-4.096 8.192-4.096 12.288 0 12.288 8.192 20.48 20.48 20.48l376.832 0C876.544 729.088 712.704 888.832 512 888.832z",
          onclick: function () {
            pieData();
            initChart();
          },
        },
        myLine: {
          show: true,
          title: "切换为折线图",
          icon: "path://M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",
          onclick: function () {
            lineData();
            initChart();
          },
        },
        myBar: {
          show: true,
          title: "切换为柱状图",
          icon: "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
          onclick: function () {
            barData();
            initChart();
          },
        },

        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        type: "pie",
        label: {
          show: false,
          position: "center", //inside （在饼图上显示）,outside(默认就会出现引导线) center
          // formatter: "{b}:{c}",
        },
        labelLine: {
          show: true, //显示引导线
          length: 30, //连接饼图第1段线条的长度 length length2 不写自适应
          length2: 10, //链接饼图第2段线条长度
          smooth: true, //是否光滑连接线
        },
        radius: ["15%", "60%"],
        center: ["50%", "50%"],
        avoidLabelOverlap: true, //防止标签间的重叠
        clockwise: true,
        // startAngle: 180,
        // roseType: "area",
        roseType: "radius",
        itemStyle: {
          borderWidth: 2,
          borderRadius: 10,
          borderColor: "#fff",
        },
        emphasis: {
          // disabled: false, // 是否关闭高亮状态,默认关闭
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
        data: dataList.value,
        animationEasing: "cubicInOut",
        animationDuration: 2600,
      },
    ],
  };
}

function barData() {
  let xAxisData = dataList.value.map((item) => item.name);
  let seriesData = dataList.value.map((item) => item.value);
  option.value = {
    title: {
      ...options.title,
      text: title.value,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        myPie: {
          show: true,
          title: "切换为饼状图",
          icon: "path://M512 98.304C282.624 98.304 98.304 282.624 98.304 512s184.32 413.696 413.696 413.696c229.376 0 413.696-184.32 413.696-413.696S741.376 98.304 512 98.304zM888.832 491.52l-331.776 0 233.472-233.472C847.872 323.584 884.736 401.408 888.832 491.52zM512 888.832c-208.896 0-376.832-167.936-376.832-376.832 0-208.896 167.936-376.832 376.832-376.832 98.304 0 184.32 36.864 253.952 98.304l-266.24 266.24c-4.096 4.096-4.096 8.192-4.096 12.288 0 12.288 8.192 20.48 20.48 20.48l376.832 0C876.544 729.088 712.704 888.832 512 888.832z",
          onclick: function () {
            pieData();
            initChart();
          },
        },
        // myBar: {
        //   show: true,
        //   title: "切换为柱状图",
        //   icon: "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
        //   onclick: function () {
        //     barData();
        //     initChart();
        //   },
        // },
        // myLine: {
        //   show: true,
        //   title: "切换为折线图",
        //   icon: "path://M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",
        //   onclick: function () {
        //     lineData();
        //     initChart();
        //   },
        // },
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "折线图",
            bar: "柱状图",
          },
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: seriesData,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
}

function lineData() {
  let xAxisData = dataList.value.map((item) => item.name);
  let seriesData = dataList.value.map((item) => item.value);
  option.value = {
    title: {
      ...options.title,
      text: title.value,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    toolbox: {
      show: true,
      feature: {
        dataView: { readOnly: false },
        myPie: {
          show: true,
          title: "切换为饼状图",
          icon: "path://M512 98.304C282.624 98.304 98.304 282.624 98.304 512s184.32 413.696 413.696 413.696c229.376 0 413.696-184.32 413.696-413.696S741.376 98.304 512 98.304zM888.832 491.52l-331.776 0 233.472-233.472C847.872 323.584 884.736 401.408 888.832 491.52zM512 888.832c-208.896 0-376.832-167.936-376.832-376.832 0-208.896 167.936-376.832 376.832-376.832 98.304 0 184.32 36.864 253.952 98.304l-266.24 266.24c-4.096 4.096-4.096 8.192-4.096 12.288 0 12.288 8.192 20.48 20.48 20.48l376.832 0C876.544 729.088 712.704 888.832 512 888.832z",
          onclick: function () {
            pieData();
            initChart();
          },
        },
        // myBar: {
        //   show: true,
        //   title: "切换为柱状图",
        //   icon: "path://M6.7,22.9h10V48h-10V22.9zM24.9,13h10v35h-10V13zM43.2,2h10v46h-10V2zM3.1,58h53.7",
        //   onclick: function () {
        //     barData();
        //     initChart();
        //   },
        // },
        // myLine: {
        //   show: true,
        //   title: "切换为折线图",
        //   icon: "path://M4.1,28.9h7.1l9.3-22l7.4,38l9.7-19.7l3,12.8h14.9M4.1,58h51.4",
        //   onclick: function () {
        //     lineData();
        //     initChart();
        //   },
        // },
        magicType: {
          show: true,
          type: ["line", "bar"],
          title: {
            line: "折线图",
            bar: "柱状图",
          },
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: seriesData,
        type: "line",
        smooth: true,
      },
    ],
  };
}
let myChart: echarts.ECharts;
function initChart() {
  myChart && myChart.dispose();
  myChart = echarts.init(pieOneRef.value!);
  myChart.setOption(option.value, true);
}
onMounted(() => {
  pieData(); // 默认饼图
  initChart(); // 初始化
  useEcharts(myChart, option.value); // 添加监听
});

onBeforeUnmount(() => {
  myChart && myChart.dispose();
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
