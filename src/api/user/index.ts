/**
 * 用户请求api
 */
import request from "@/utils/request";
import type { LoginData } from "./type";

/**
 * @description 登录接口
 * @param data:{loginData}
 * @returns
 */
export function reqLoginApi(data: LoginData) {
  return request({
    url: `/user/login`,
    method: "post",
    data,
  });
}

/**
 * 注销
 */
export function reqLogoutApi() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}

/**
 * @description 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function reqGetUserInfoApi(token: string) {
  return request({
    url: `/user/info`,
    method: "get",
    params: { token },
  });
}

/**
 * 获取路由菜单集合
 * @returns
 */
export function reqGetRouteListApi() {
  return request({
    url: `/user/menus`,
    method: "get",
  });
}
