/**
 * static 静态路由
 */
import { RouteRecordRaw } from "vue-router";

// 公共路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    // 统一处理
    path: "/*",
    redirect: "/404",
    meta: {
      hidden: true,
    },
  },
  /*
  const routes = [
    // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // 将匹配以 `/user-` 开头的所有内容，并将其放在 `$route.params.afterUser` 下
    { path: '/user-:afterUser(.*)', component: UserGeneric },
  ]
  */
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () => import("@/views/error/404"),
  //   hidden: true,
  // },
];
