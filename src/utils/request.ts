/**
 * 封装axios
 */

import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import useUserStore from "@/store/modules/user"; // 用户状态管理
import { getToken } from "@/utils/cookie_token";
import { ElMessage, ElMessageBox } from "element-plus";

interface ICodeMessage {
  [propName: number]: string;
}

const StatusCodeMessage: ICodeMessage = {
  200: "服务器成功返回请求的数据",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）",
  204: "删除数据成功",
  400: "请求错误(400)",
  401: "未授权，请重新登录(401)",
  403: "拒绝访问(403)",
  404: "请求出错(404)",
  408: "请求超时(408)",
  500: "服务器错误(500)",
  501: "服务未实现(501)",
  502: "网络错误(502)",
  503: "服务不可用(503)",
  504: "网络超时(504)",
};

// 1.创建实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 默认地址请求地址，可在 .env.*** 文件中修改
  timeout: 50000, // 设置超时时间（10s）
  withCredentials: true, // 跨域时候允许携带凭证
  // headers: { "Content-Type": "application/json;charset=utf-8" }, // 自定义请求头
});

// 2.请求拦截器
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

// 3.响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message } = response.data;
    // console.log(response);

    if (code === "00000") {
      // code码正常，正常响应数据
      return response.data;
    } else {
      console.log(1);

      // code码错误
      ElMessage({
        message: message || "系统出错",
        type: "error",
      });
      // 抛出错误
      return Promise.reject(new Error(message || "Error"));
    }
  },
  (error) => {
    // 捕获错误
    const status = error.response.status;
    console.log(2, error.response);
    // alert(JSON.stringify(error.response));
    if (status === "401") {
      // token 过期
      localStorage.clear(); // 清除浏览器全部缓存
      ElMessageBox.alert("当前页面已失效，请重新登录", "提示", {})
        .then(() => {})
        .catch(() => {})
        .finally(() => {
          window.location.href = "/login"; // 跳转登录页
        });
    } else {
      ElMessage({
        message: StatusCodeMessage[status] || "系统出错",
        type: "error",
      });
    }
    return Promise.reject(
      new Error(StatusCodeMessage[status] || `${status} Error`)
    );
  }
);

// 导出 axios 实例
export default service;
