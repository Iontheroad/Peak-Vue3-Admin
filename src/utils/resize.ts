// 侧边栏、浏览器窗口大小切换都会触发图表的 resize() 方法来进行自适应
import { ref } from "vue";
export default function () {
  const chart = ref<any>();
  const sidebarElm = ref<Element>();

  const chartResizeHandler = () => {
    if (chart.value) {
      chart.value.resize();
    }
  };

  const sidebarResizeHandler = (e: TransitionEvent) => {
    if (e.propertyName === "width") {
      chartResizeHandler();
    }
  };

  const initResizeEvent = () => {
    window.addEventListener("resize", chartResizeHandler);
  };

  const destroyResizeEvent = () => {
    window.removeEventListener("resize", chartResizeHandler);
  };

  const initSidebarResizeEvent = () => {
    sidebarElm.value = document.getElementsByClassName("sidebar-container")[0];
    if (sidebarElm.value) {
      sidebarElm.value.addEventListener(
        "transitionend",
        sidebarResizeHandler as EventListener
      );
    }
  };

  const destroySidebarResizeEvent = () => {
    if (sidebarElm.value) {
      sidebarElm.value.removeEventListener(
        "transitionend",
        sidebarResizeHandler as EventListener
      );
    }
  };

  const mounted = () => {
    initResizeEvent();
    initSidebarResizeEvent();
  };

  const beforeDestroy = () => {
    destroyResizeEvent();
    destroySidebarResizeEvent();
  };

  const activated = () => {
    initResizeEvent();
    initSidebarResizeEvent();
  };

  const deactivated = () => {
    destroyResizeEvent();
    destroySidebarResizeEvent();
  };

  return {
    chart,
    mounted,
    beforeDestroy,
    activated,
    deactivated,
  };
}
