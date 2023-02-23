/**
 * 权限路由
 * 用户角色获取拥有权限的路由(静态路由+动态路由)
 */
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { constantRoutes } from "@/routers"; // 静态路由
// import { getListRoutesApi } from "@/api/system/menu";
import { getListRoutesApi } from "@/api/index";
const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

/**
 * 使用meta.role属性，以确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    if (roles.includes("ROOT")) {
      // 判断该用户的角色(身份)集合里是否有ROOT角色
      // 角色ROOT(超级管理员)  拥有所有路由权限
      return true;
    }
    // 遍历该用户的角色(身份)集合
    return roles.some((role) => {
      // 确保当前路由拥有roles属性
      if (route.meta?.roles !== undefined) {
        // 看看当前路由 是否拥有当前用户的角色[集合]身份之一
        return (route.meta.roles as string[]).includes(role);
      }
    });
  }
  return false;
}

/**
 * 通过递归过滤异步路由表
 * @param routes 异步路由集合
 * @param roles  用户角色信息集合
 */
function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []; //  存储过滤后的路由
  // 遍历路由
  routes.forEach((route) => {
    const tmp = { ...route } as any; // 当前路由信息
    // 是否拥有该项路由的权限
    if (hasPermission(roles, tmp)) {
      // 赋值组件
      if (tmp.component == "Layout") {
        tmp.component = Layout;
      } else {
        const component = modules[`../../views/${tmp.component}.vue`] as any;
        // const component = () => import(`../../views/${tmp.component}.vue`);
        if (component) {
          tmp.component = component;
        } else {
          tmp.component = modules[`../../views/error-page/404.vue`];
        }
      }
      // 如果当前路由有子路由就递归
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      // 添加路由,进入下一轮循环
      res.push(tmp);
    }
  });
  return res; // 循环结束返回收集的路由
}

export const usePermissionStore = defineStore({
  id: "permissionStore",
  state: () => ({
    routes: [] as Array<RouteRecordRaw>, // 静态路由 + 动态路由
    addRoutes: [] as RouteRecordRaw[], // 动态路由
  }),
  actions: {
    // 设置路由
    setRoutes(routes: RouteRecordRaw[]) {
      // console.log(this, "jjjj");

      this.addRoutes = routes; // 记录异步路由
      // 静态路由 + 动态路由
      this.routes = constantRoutes.concat(routes); // 合并静态和动态路由
    },

    // 获取异步路由
    async getListRoutes_action(roles: string[]) {
      try {
        // 获取动态路由
        let result = await getListRoutesApi();
        // console.log(result);

        const asyncRoutes = result.data; // 拿到异步路由
        let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles); // 拿到遍历后的异步路由
        this.setRoutes(accessedRoutes);
        return Promise.resolve(accessedRoutes);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  getters: {
    // routeList_getter(state) {
    //   return state.routes;
    // },
  },
});

export default usePermissionStore;
