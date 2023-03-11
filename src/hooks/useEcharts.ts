import {
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  nextTick,
  watchEffect,
  watch,
  ref,
  computed,
} from "vue";
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
  const echartsResize = useDebounceFn(() => {
    myChart && myChart.resize();
  }, 100);

  window.addEventListener("resize", echartsResize);

  // 监听sidebar栏 动画
  const transitionendFun = (event: TransitionEvent) => {
    // 传递 触发的事件对象，用于对比出菜单栏
    sidebarTransition(event, echartsResize);
  };
  window.addEventListener("transitionend", transitionendFun);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
    window.removeEventListener("transitionend", transitionendFun);
  });

  onActivated(() => {
    window.addEventListener("resize", echartsResize);
    window.addEventListener("transitionend", transitionendFun);
  });

  onDeactivated(() => {
    window.removeEventListener("resize", echartsResize);
    window.removeEventListener("transitionend", transitionendFun);
  });

  // return function removeFun() {
  //   window.removeEventListener("resize", echartsResize);
  // };
};

/**
 * 菜单栏监听
 * @param event
 * @param callback  //  echarts的 resize函数
 */
function sidebarTransition(event: TransitionEvent, callback: () => void) {
  let sidebar = document.querySelector(".sidebar-container")!;
  if (sidebar == event.target && event.propertyName == "width") {
    callback && callback();
  }
}
