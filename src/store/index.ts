/**
 * 状态仓库
 */

import { createPinia, defineStore } from "pinia";
import useUserStore from "./modules/user";

// 全局状态
const useGlobalStore = defineStore("globalStore", {
  state: () => ({
    /* 主体配置 */
    themeConfig: {
      isShowLogo: true, // 是否显示Logo
      isFixedHeader: true, // 是否固定表头
      isShowTagsView: true, // 是否显示标签视图
    },
  }),
});

const pinia = createPinia();

//
export { useGlobalStore, useUserStore };
export default pinia;
