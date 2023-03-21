import { onBeforeUnmount, onActivated, onDeactivated } from "vue";
import { useDebounceFn } from "@vueuse/core";
import * as echarts from "echarts";

/**
 * @description 使用Echarts(只是为了添加图表响应式)
 * @param {Element} myChart Echarts实例(必传)
 * @param {Object} options 绘制Echarts的参数(必传)
 * @return void
 * */
export const useEcharts = (
  myChart: echarts.ECharts,
  options: echarts.EChartsCoreOption
) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }
  const echartsResize = useDebounceFn((event) => {
    // console.log(event);

    myChart && myChart.resize();
  }, 100);

  // 监听浏览器窗口大小
  window.addEventListener("resize", echartsResize);

  // 监听菜单栏 动画
  let layout_menu = document.getElementsByClassName(
    "layout_menu"
  )[0] as HTMLElement;
  layout_menu.addEventListener("transitionend", echartsResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
    layout_menu.removeEventListener("transitionend", echartsResize);
  });

  onActivated(() => {
    window.addEventListener("resize", echartsResize);
    layout_menu.addEventListener("transitionend", echartsResize);
  });

  onDeactivated(() => {
    window.removeEventListener("resize", echartsResize);
    layout_menu.removeEventListener("transitionend", echartsResize);
  });
};
