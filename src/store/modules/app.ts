/**
 * 页面的一些状态
 *   菜单栏,语言,大小
 */

import {
  getSidebarStatus,
  setSidebarStatus,
  getSize,
  setSize,
} from "@/utils/localStorage"; // 本地存储
import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useStorage } from "@vueuse/core";

export enum DeviceType {
  mobile,
  desktop,
}

export enum SizeType {
  default,
  large,
  small,
}

// setup
export const useAppStore = defineStore("app", () => {
  // state
  // 菜单栏
  const sidebar = reactive({
    opened: getSidebarStatus() !== "closed", // 导航栏展开(opened)收起(closed)
    // TAG: 该属性待研究，展示是控制动画是否关闭的
    withoutAnimation: false, // 移动窗口宽度小于992变为true
  });
  // pc：desktop    移动： mobile 窗口宽度小于992
  const device = useStorage<string>("device", "desktop"); //默认pc  自动存取
  const size = ref(getSize() || "default"); // 布局大小

  // actions

  /**
   * 菜单展开收起
   * @param withoutAnimation
   */
  function toggleSidebar(withoutAnimation: boolean = false) {
    sidebar.opened = !sidebar.opened;
    sidebar.withoutAnimation = withoutAnimation;
    // 菜单状态存入本地
    if (sidebar.opened) {
      setSidebarStatus("opened");
    } else {
      setSidebarStatus("closed");
    }
  }
  /**
   * 关闭菜单
   * @param withoutAnimation
   */
  function closeSideBar(withoutAnimation: boolean) {
    sidebar.opened = false;
    sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus("closed");
  }
  /**
   * 展开菜单
   * @param withoutAnimation
   */
  function openSideBar(withoutAnimation: boolean) {
    sidebar.opened = true;
    sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus("opened");
  }

  /**
   * 切换设备
   * @param val(desktop | mobile)
   */
  function toggleDevice(val: string) {
    device.value = val;
  }

  /**
   * 更换主题大小
   * @param val(default | large | small)
   */
  function changeSize(val: string) {
    size.value = val;
    setSize(val);
  }

  return {
    device,
    sidebar,
    size,
    toggleDevice,
    changeSize,
    toggleSidebar,
    closeSideBar,
    openSideBar,
  };
});
