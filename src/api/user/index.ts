/**
 * 用户请求api
 */

import request from "@/utils/request";

/**
 * @description 登录成功后获取用户信息（昵称、头像、权限集合和角色集合）
 */
export function getUserInfoApi(token: string) {
  return request({
    url: `/api/v1/users/me`,
    method: "get",
    params: { token },
  });
}
