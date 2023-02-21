/**
 * login api
 */

import request from "@/utils/request";
import { LoginData } from "./login";
// import type { LoginData } from "./index";

/**
 * @description 登录接口
 * @param data:{loginData}
 * @returns
 */
export function reqLoginApi(data: LoginData) {
  return request({
    url: `/api/v1/auth/login`,
    method: "post",
    params: data,
  });
}

/**
 * 注销
 */
export function reqLogoutApi() {
  return request({
    url: "/api/v1/auth/logout",
    method: "delete",
  });
}
