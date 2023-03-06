/**
 * peak
 * 用户状态模块
 */
import { defineStore } from "pinia";
import { getUserInfoApi } from "@/api/user";
import { reqLoginApi, reqLogoutApi } from "@/api/login";
import type { LoginData } from "@/api/login/login";
import { getToken, removeToken, setToken } from "@/utils/cookie_token";

/**
 * 用户信息类型
 */
interface UserInfo {
  avatar: string;
  nickname: string;
  perms: string[];
  roles: Array<string>;
  userId: number | string;
}

export const useUserStore = defineStore("userStore", {
  // id: "userStore",
  state: () => ({
    token: getToken(), // token
    // 用户信息
    userInfo: {
      avatar: "", // 头像
      nickname: "", // 身份
      perms: [], //按钮权限字段
      roles: [], // 角色
      userId: "", // 用户id
    } as UserInfo,
  }),
  actions: {
    /**
     * 点击登录
     * @param data
     * @returns
     */
    async login_actions(data: LoginData) {
      try {
        let result = await reqLoginApi(data);
        this.token = result.data.accessToken; // 保存Token
        setToken(result.data.accessToken);
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * 获取用户信息
     * @returns
     */
    async getUserInfo_actions() {
      try {
        let result = await getUserInfoApi(this.token as string);
        this.userInfo = result.data;
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * 退出登录
     * @returns
     */
    async logout_actions() {
      try {
        const result = await reqLogoutApi();
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        this.resetUser();
      }
    },

    /**
     * 重置用户数据
     */
    resetUser() {
      // 重置数据
      removeToken();
      this.token = ""; // 仓库的token也要清除
      this.userInfo = {
        avatar: "", // 头像
        nickname: "", // 身份
        perms: [], //权限字段
        roles: [], // 角色
        userId: "", // 用户id
      };
    },
  },
});

export default useUserStore;
