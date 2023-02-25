/**
 * 状态仓库
 */

import { createPinia, defineStore } from "pinia";
import useUserStore from "./modules/user";
import { getLanguage } from "@/lang/index";
import { setLanguage } from "@/utils/localStorage";

// 全局状态
const useGlobalStore = defineStore("globalStore", {
  state: () => ({
    elementSize: "default" as "default" | "large" | "small",
    language: getLanguage(), // 获取语言
    /* 主体配置 */
    themeConfig: {
      isShowLogo: true, // 是否显示Logo
      isFixedHeader: true, // 是否固定表头
      isShowTagsView: true, // 是否显示标签视图
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

//
export { useGlobalStore, useUserStore };
export default pinia;
