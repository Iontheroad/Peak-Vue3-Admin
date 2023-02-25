/**
 * 页面的一些状态
 *   菜单栏,语言,大小
 */

import {
  getSidebarStatus,
  setSidebarStatus,
  getSize,
  setSize,
  setLanguage,
} from "@/utils/localStorage"; // 本地存储
import { defineStore } from "pinia";
import { getLanguage } from "@/lang/index";
import { computed, reactive, ref } from "vue";
import { useStorage } from "@vueuse/core";

// Element Plus 语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";

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

  /** 判断语言包 */
  const language = ref(getLanguage()); // 获取语言
  const locale = computed(() => {
    if (language?.value == "en") {
      return en;
    } else {
      return zhCn;
    }
  });

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
   * 更换大小
   * @param val(default | large | small)
   */
  function changeSize(val: string) {
    size.value = val;
    setSize(val);
  }
  /**
   * 更换语言
   * @param val(zh-cn | en)
   */
  function changeLanguage(val: string) {
    language.value = val;
    setLanguage(val);
  }

  return {
    device,
    sidebar,
    language,
    locale,
    size,
    toggleDevice,
    changeSize,
    changeLanguage,
    toggleSidebar,
    closeSideBar,
    openSideBar,
  };
});
