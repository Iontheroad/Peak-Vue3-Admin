/**
 * 封装axios
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import useUserStore from "@/store/modules/user"; // 用户状态管理
import { getToken } from "@/utils/cookie_token";
import { ElMessage, ElMessageBox } from "element-plus";
// 创建实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 默认地址请求地址，可在 .env.*** 文件中修改
  timeout: 50000, // 设置超时时间（10s）
  withCredentials: true, // 跨域时候允许携带凭证
  // headers: { "Content-Type": "application/json;charset=utf-8" }, // 自定义请求头
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      // 预期的'config'和'config.headers' 不可未定义
      throw new Error(
        `Expected 'config' and 'config.headers' not to be undefined`
      );
    }
    // 获取用户token
    const userStore = useUserStore();
    if (userStore.token) {
      // token 添加到请求头
      config.headers.Authorization = getToken();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    // console.log(response);

    if (code === "00000") {
      // code码正常，正常响应数据
      return response.data;
    } else {
      // code码错误
      ElMessage({
        message: msg || "系统出错",
        type: "error",
      });
      // 抛出错误
      return Promise.reject(new Error(msg || "Error"));
    }
  },
  (error) => {
    // 捕获错误
    const { code, msg } = error.response.data;
    if (code === "A0230") {
      // token 过期
      localStorage.clear(); // 清除浏览器全部缓存
      window.location.href = "/"; // 跳转登录页
      ElMessageBox.alert("当前页面已失效，请重新登录", "提示", {})
        .then(() => {})
        .catch(() => {});
    } else {
      ElMessage({
        message: msg || "系统出错",
        type: "error",
      });
    }
    return Promise.reject(new Error(msg || "Error"));
  }
);

// 导出 axios 实例
export default service;
