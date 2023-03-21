/**
 * dynamic 异步动态路由
 *     添加动态路由菜单
 */
import router from "@/routers";
import { notFoundRoute } from "@/routers/modules/static-router";
import { usePermissionStore } from "@/store/modules/permission";
import { useUserStore } from "@/store/modules/user"; // 用户状态仓库
import { RouteRecordRaw } from "vue-router";

/**
 * 初始化 添加异步路由信息
 * @param roles  用户角色信息集合
 */
export const initDynamicRoute = async (roles: string[]) => {
  const permissionStore = usePermissionStore();
  const userStore = useUserStore();

  try {
    // 1.获取异步路由菜单
    await permissionStore.getListRoutes_action(roles);
    let addRoutes = permissionStore.addRoutes;
    // 2.遍历异步路由添加
    addRoutes.forEach((item) => {
      router.addRoute(item as RouteRecordRaw);
    });
    // 3.最后添加 notFoundRoute
    router.addRoute(notFoundRoute);
  } catch (error) {
    //  当菜单请求出错时，重定向到登陆页
    userStore.resetUser();
    router.replace("/login");
    return Promise.reject(error);
  }
};
