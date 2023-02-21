/**
 * peak
 * 用户状态模块
 */
import { defineStore } from "pinia";
import { getUserInfoApi } from "@/api/user";
import { reqLoginApi, reqLogoutApi } from "@/api/login";
import { LoginData } from "@/api/login/login";
import { getToken, removeToken, setToken } from "@/utils/cookie_token";

const useUserStore = defineStore("userStore", {
  // id: "userStore",
  state: () => ({
    token: getToken(), // token
    userInfo: {
      avatar: "", // 头像
      nickname: "", // 身份
      perms: [], //按钮权限字段
      roles: [], // 角色
      userId: "", // 用户id
    } as {
      avatar: string;
      nickname: string;
      perms: string[];
      roles: Array<string>;
      userId: number | string;
    },
  }),
  actions: {
    // 点击登录
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

    //  获取 用户信息
    async getUserInfo_actions() {
      try {
        let result = await getUserInfoApi(this.token as string);
        this.userInfo = result.data;
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    // 退出登录
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

    // 重置数据
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
