/**
 * 状态仓库
 */

import { createPinia, defineStore } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import useUserStore from "./modules/user";
import { getLanguage } from "@/lang/index";
import { setLanguage } from "@/utils/localStorage";
import { DEFAULT_PRIMARY } from "@/config/config";

interface GlobalType {
  elementSize: "default" | "large" | "small";
  language: string;
  themeConfig: ThemeConfigProps;
}
interface ThemeConfigProps {
  layout: "vertical" | "classic" | "transverse" | "columns";
  isShowLogo: boolean;
  isFixedHeader: boolean;
  isShowTabsView: boolean;
  isShowTabsIcon: boolean;
  primary: string;
  isDark: Boolean;
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
      primary: DEFAULT_PRIMARY, // 默认 primary 主题颜色
      isDark: false,
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

    /**
     * 设置主题
     * @param themeConfig
     */
    setThemeConfig(themeConfig: ThemeConfigProps) {
      this.themeConfig = themeConfig;
    },
  },

  persist: {
    enabled: true, // 开启数据存储
    strategies: [
      {
        key: "globalStore",
        storage: localStorage,
        paths: [],
      },
    ],
  } as PersistedStateOptions,
});

const pinia = createPinia();
// 数据持久化
pinia.use(piniaPluginPersistedstate);
export { useGlobalStore, useUserStore };
export default pinia;
