/**
 * 用户信息相关 mock接口
 */

import { MockMethod } from "vite-plugin-mock";
import menulist from "./data/menuList.json";
import Mock from "mockjs";
import { dayjs } from "element-plus";

// 成功响应包
export const successResponseWrap = (data: unknown) => {
  return Mock.mock({
    code: "00000",
    data,
    message: "请求成功",
    success: true,
  });
};
// 失败响应包
export const failResponseWrap = (
  data: unknown,
  message: string,
  code = 50000
) => {
  return Mock.mock({
    code,
    data,
    message,
    success: false,
  });
};
type Body = { username: string; password: string };
export default [
  {
    // 登录接口
    url: "/mock/user/login",
    method: "post",
    timeout: 300,
    response: ({ body }: { body: Body }) => {
      let { username, password } = body;
      if (!username) {
        return failResponseWrap(null, "用户名不能为空", 50000);
      }
      if (!password) {
        return failResponseWrap(null, "密码不能为空", 50000);
      }
      if (username === "admin" && password === "123456") {
        return {
          code: "00000",
          data: { accessToken: "peak-vue3-admin-token2023" },
          message: "请求成功",
          success: true,
        };
      }
      return failResponseWrap(null, "账号或者密码错误", 50000);
    },
  },
  {
    // 退出登录接口
    url: "/mock/user/logout",
    method: "post",
    timeout: 300,
    response: () => {
      return successResponseWrap(null);
    },
  },
  {
    // 获取用户信息接口
    url: "/mock/user/info",
    method: "get",
    timeout: 300,
    response: () => {
      return {
        code: "00000",
        data: {
          userId: 2,
          nickname: "Peak",
          avatar:
            "https://img0.baidu.com/it/u=4100351681,3622422042&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300",
          roles: ["ADMIN"],
          perms: ["sys:user:edit", "sys:user:delete", "sys:user:add"],
          userInfo: {
            name: "Peak",
            email: "18240729508@163.com",
            phone: "18240729508",
            registrationDate: dayjs(+new Date()).format("YYYY-MM-DD HH:mm:ss"),
          },
        },
        message: "请求成功",
        success: true,
      };
    },
  },
  {
    // 获取权限菜单接口
    url: `/mock/user/menus`,
    method: "get",
    timeout: 300,
    response: () => {
      return {
        code: "00000",
        data: menulist,
        message: "请求成功",
        success: true,
      };
    },
  },
] as MockMethod[];
