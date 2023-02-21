/**
 * 状态仓库
 */

import { createPinia, defineStore } from "pinia";
import useUserStore from "./modules/user";

// 全局状态
const userGlobalStore = defineStore("globalStore", {
  state: () => ({}),
});

const pinia = createPinia();

//
export { userGlobalStore, useUserStore };
export default pinia;
