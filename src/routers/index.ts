/**
 * 路由规则
 */

import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import { staticRoute, errorRoute } from "@/routers/modules/static-router";
import { ElMessage } from "element-plus";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import { usePermissionStore } from "@/store/modules/permission"; // 权限
import useUserStore from "@/store/modules/user"; // 用户状态仓库
import { initDynamicRoute } from "./modules/dynamic-router"; // 添加异步路由

// 进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});
// 路由白名单
const whiteRouterList = ["/login"];

/**
 * 路由类型
 */
export namespace routeOptionsType {
  export interface RouteType {
    path: string;
    name?: string;
    redirect?: string;
    component?: Promise<typeof import("*.vue")> | string;
    children?: RouteType[];
    meta: RouteMetaType;
  }
  export interface RouteMetaType {
    title: string;
    icon: string;
    roles: string[];
    activeMenu?: string;
    isHidden?: boolean;
    isLink: boolean;
    isFull?: boolean;
    isAffix?: boolean;
    isKeepAlive?: boolean;
    isBreadcrumbHidden?: boolean;
    isAlwaysShow?: boolean;
  }
}

/**
 * @description 路由参数配置
 * @param path ==> 路径
 * @param name ==> 路由别名
 * @param redirect ==> 重定向 // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * @param component ==> 对应组件
 * @param children ==> 子路由
 * @param meta ==> 路由元信息
 * @param meta.title ==> 菜单标题
 * @param meta.icon ==> 菜单图标
 * @param meta.roles ==> 进入该路由的权限,['admin', 'editor']
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单 比如：一个文章的列表页路由为：/article/list ,点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行设置
 * @param meta.isHidden ==>(默认false) 是否隐藏该路由, 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * @param meta.isLink ==>(默认false) 是否外链(点击跳转)
 * @param meta.isFull ==>(默认false) 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==>(默认false) 是否固定在 tabs nav
 * @param meta.isKeepAlive ==>(默认false) 是否缓存,如果设置为true，则不会被 <keep-alive> 缓存
 * @param meta.isBreadcrumbHidden ==>(默认false)是否隐藏面包屑 如果设置为true，则不会在breadcrumb面包屑中显示
 * @param meta.isAlwaysShow ==>(默认false) 当你一个路由下面的 children 声明的子路由大于1个时，自动会变成嵌套的模式, 只有一个时会将那个子路由当做根路由显示在侧边栏--如引导页面, 若你想不管路由下面的 children 声明的个数都显示你的根路由, 你可以设置true，这样它就会忽略之前定义的规则，一直显示根路由.
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  ...staticRoute,
  ...errorRoute,
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
import { getToken, removeToken, setToken } from "@/utils/cookie_token";
// 全局前置守卫
router.beforeEach(async (to, form, next) => {
  NProgress.start(); // 开始进度条
  const userStore = useUserStore();
  let title = import.meta.env.VITE_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title; // 动态标题

  // const hasToken = getToken(); // 获取token
  // HACK: token过期后，点击的页面没有接口不回跳转到登录页
  const hasToken = userStore.token; // 获取token
  //  判断是否登录
  if (hasToken) {
    if (to.path == "/login") {
      // 登录后访问logo页，就还是返回上一级
      next({ path: form.fullPath });
      NProgress.done(); // 关闭进度条
    } else {
      // 登录后访问login以外的页面
      const hasGetUserInfo = userStore.userInfo.roles.length > 0;
      // 判断是否拿到用户角色信息
      if (hasGetUserInfo) {
        // 拿到就直接通过
        next();
      } else {
        // 没有拿到用户信息，就重新获取一下用户信息
        try {
          await userStore.getUserInfo_actions();
          const roles = userStore.userInfo.roles; // 当前用户的角色(身份)集合
          await initDynamicRoute(roles); // 添加路由
          next({ ...to, replace: true });
        } catch (error) {
          // 获取 用户信息失败，移除token 并跳转到登录页
          userStore.resetUser();
          ElMessage.error((error as Error) || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    // 没有token
    // 未登录可以访问的白名单页面(登录页面)
    if (whiteRouterList.includes(to.path)) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // 重定向login
      NProgress.done(); // 关闭进度条
    }
  }
});

/**
 * 路由跳转结束
 */
router.afterEach(() => {
  NProgress.done();
});

export default router;

// 重置路由 ， 退出登录时清空路由
export function resetRouter() {
  const permissionStore = usePermissionStore();
  permissionStore.menubarList_getters.forEach((route) => {
    const name = route.name;
    if (name) {
      // 先判断路由是否存在，存在就删除
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}
