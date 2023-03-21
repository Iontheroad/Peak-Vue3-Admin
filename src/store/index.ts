/**
 * 状态仓库
 */

import { createPinia, defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import useUserStore from "./modules/user";
import { getLanguage } from "@/lang/index";
import { setLanguage } from "@/utils/localStorage";

interface GlobalType {
  elementSize: "default" | "large" | "small";
  language: string;
  themeConfig: {
    layout: "vertical" | "classic" | "transverse" | "columns";
    isShowLogo: boolean;
    isFixedHeader: boolean;
    isShowTabsView: boolean;
    isShowTabsIcon: boolean;
  };
}

// 全局状态
const useGlobalStore = defineStore("globalStore", {
  state: (): GlobalType => ({
    elementSize: "default",
    language: getLanguage(), // 获取语言
    /* 主体配置 */
    themeConfig: {
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      isShowLogo: true, // 是否显示Logo
      isFixedHeader: true, // 是否固定表头
      isShowTabsView: true, // 是否显示标签视图
      isShowTabsIcon: true, // 是否显示标签icon
    },
  }),

  actions: {
    /**
     * 修改语言
     * @param language
     */
    changeLanguage(language: string) {
      this.language = language;
      setLanguage(language); // 存储到本地
    },
  },
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
//
export { useGlobalStore, useUserStore };
export default pinia;
