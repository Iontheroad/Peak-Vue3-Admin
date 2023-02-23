/**
 * 对路由访问进行拦截认证
 * auth 拦截
 */

import { RouteRecordRaw } from "vue-router";
import router from "@/routers";
import { ElMessage } from "element-plus";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import useUserStore from "@/store/modules/user"; // 用户状态仓库
import usePermissionStore from "@/store/modules/permission";
import { notFoundRoute } from "@/routers/modules/static-router";

// 进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

// 白名单路由
const whiteRouterList = ["/login"];

// 全局前置守卫
router.beforeEach(async (to, form, next) => {
  NProgress.start(); // 开始进度条
  const userStore = useUserStore();

  const hasToken = userStore.token; // 获取token
  //  判断是否登录
  if (hasToken) {
    if (to.path == "/login") {
      // 访问login，切换到首页
      next({ path: "/" }); // 跳转首页
      NProgress.done(); // 关闭进度条
    } else {
      // 登录后访问login页面以外
      const hasGetUserInfo = userStore.userInfo.roles.length > 0;
      // 判断是否拿到用户角色信息
      if (hasGetUserInfo) {
        // 拿到就直接通过
        next();
      } else {
        // 没有拿到用户信息，
        try {
          // 重新获取一下用户信息
          await userStore.getUserInfo_actions();
          const roles = userStore.userInfo.roles; // 当前用户的角色(身份)集合
          // 其中 const accessRoutes: any = await permission.generateRoutes(roles)是根据用户角色获取拥有权限的路由(静态路由+动态路由)
          // 用户拥有权限的路由集合(accessRoutes)
          const permissionStore = usePermissionStore(); // 权限路由状态仓库
          const accessRoutes: any = await permissionStore.getListRoutes_action(
            roles
          );
          // console.log(accessRoutes);

          // 遍历重新获取的路由集火
          accessRoutes.forEach((route: any) => {
            // 添加
            router.addRoute(route);
          });

          // 最后添加 notFoundRoute
          router.addRoute(notFoundRoute);
          next({ ...to, replace: true });
        } catch (error) {
          // 获取 用户信息失败
          // 移除token 并跳转到登录页
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

router.afterEach(() => {
  NProgress.done();
});
