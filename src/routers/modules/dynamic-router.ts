import { RouteRecordRaw } from "vue-router";
/**
 * dynamic 动态路由
 */

const Layout = () => import("@/layout/index.vue");

export const dynamicRoute: RouteRecordRaw[] = [
  {
    // 首页
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
          icon: "dashboard",
        },
      },
    ],
  },
];
