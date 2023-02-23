/**
 * static 静态路由
 */
import { RouteRecordRaw } from "vue-router";

/**
 * staticRoute 静态路由
 */
export const staticRoute: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      isHidden: true,
    },
  },
  {
    // 首页
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "dashboard",
          icon: "dashboard",
        },
      },
    ],
  },
];

/**
 * errorRoute 错误页面路由
 */
export const errorRoute = [
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    meta: {
      isHidden: true,
    },
  },
];

/**
 * notFoundRoute （找不到路由）
 */
export const notFoundRoute: RouteRecordRaw = {
  // 统一处理
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  meta: {
    isHidden: true,
  },
  /*
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
};
