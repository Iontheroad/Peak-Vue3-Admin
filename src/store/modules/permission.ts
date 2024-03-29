/**
 * 权限 permission
 *     通过用户的角色信息拿到最终的 异步路由菜单
 */
import { defineStore } from "pinia";
import { RouteRecordRaw } from "vue-router";
import { staticRoute } from "@/routers/modules/static-router"; // 静态路由
import { reqGetRouteListApi } from "@/api/user";
const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

/**
 * 使用meta.role属性，以确定用户是否具有该路由的权限
 * @param roles
 * @param route
 */
function hasPermission(roles: string[], route: Menu.MenuOptions) {
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
 * 通过递归过滤异步路由表，得到最终的路由
 * @param routes 异步路由集合
 * @param roles  用户角色信息集合
 */
function filterAsyncRoutes(routes: Menu.MenuOptions[], roles: string[]) {
  const res: Menu.MenuOptions[] = []; //  存储过滤后的路由
  // 遍历路由
  routes.forEach((route) => {
    const tmp = { ...route } as any; // 当前路由信息
    // 是否拥有该项路由的权限
    if (hasPermission(roles, tmp)) {
      // 赋值组件
      if (tmp.component == "Layout") {
        tmp.component = Layout;
      } else {
        const component = modules[`../../views/${tmp.component}.vue`];
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
  id: "usePermissionStore",
  state: () => ({
    // routes: [] as Array<RouteRecordRaw>, // 静态路由 + 动态路由
    addRoutes: [] as Menu.MenuOptions[], // 动态添加路由
  }),
  actions: {
    /**
     * 获取异步路由
     * @param roles 用户的角色信息
     * @returns
     */
    async getListRoutes_action(roles: string[]) {
      try {
        // 1.获取动态路由
        let result = await reqGetRouteListApi();
        // 2.获取当前用户能访问的异步路由
        let accessedRoutes = filterAsyncRoutes(result.data, roles);
        // 3.将动态路由记录
        this.addRoutes = accessedRoutes;
        return Promise.resolve(accessedRoutes);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  getters: {
    /**
     * 获取动态路由+静态路由，用于渲染菜单栏
     * @returns
     */
    menubarList_getters(state): Menu.MenuOptions[] {
      return (staticRoute as Menu.MenuOptions[]).concat(state.addRoutes);
    },

    /**
     * 扁平化 路由
     * @param state
     */
    flatMenubarList_getters(state) {
      let routesList = (staticRoute as Menu.MenuOptions[]).concat(
        state.addRoutes
      );
      return getFlatArr(routesList);
    },
  },
});

/**
 * 扁平化路由 tabs
 * @param menuList
 * @returns
 */
function getFlatArr(menuList: Menu.MenuOptions[]) {
  let copyArr = JSON.parse(JSON.stringify(menuList)) as Menu.MenuOptions[];
  return copyArr.reduce(
    (pre: Menu.MenuOptions[], current: Menu.MenuOptions) => {
      let flatArr = [...pre, current];
      if (current?.children)
        flatArr = [...flatArr, ...getFlatArr(current.children)];
      return flatArr;
    },
    []
  );
}

export default usePermissionStore;
