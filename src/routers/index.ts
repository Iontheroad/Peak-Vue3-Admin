/**
 * 路由规则
 */

import usePermissionStore from "@/store/modules/permission";
import {
  createRouter,
  createWebHashHistory,
  RouteRecord,
  RouteRecordRaw,
} from "vue-router";

const Layout = () => import("@/layout/index.vue");

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
    isBreadcrumb: boolean;
    isAlwaysShow?: boolean;
  }
}
// 静态路由
/**
 * @description 路由参数配置
 * @param path ==> 路径
 * @param name ==> 路由别名
 * @param redirect ==> 重定向
 * @param component ==> 对应组件
 * @param children ==> 子路由
 * @param meta ==> 路由元信息
 * @param meta.title ==> 菜单标题
 * @param meta.icon ==> 菜单图标
 * @param meta.roles ==> 进入该路由的权限,['admin', 'editor']
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单 比如：一个文章的列表页路由为：/article/list ,点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行设置
 * @param meta.isHidden ==>(默认false) 是否隐藏该路由, 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * @param meta.isLink ==>(默认false) 是否外链
 * @param meta.isFull ==>(默认false) 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==>(默认false) 是否固定在 tabs nav
 * @param meta.isKeepAlive ==>(默认false) 是否缓存,如果设置为true，则不会被 <keep-alive> 缓存
 * @param meta.isBreadcrumb ==>(默认true) 如果设置为false，则不会在breadcrumb面包屑中显示
 * @param meta.isAlwaysShow ==>(默认false) 当你一个路由下面的 children 声明的子路由大于1个时，自动会变成嵌套的模式, 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面, 若你想不管路由下面的 children 声明的个数都显示你的根路由, 你可以设置true，这样它就会忽略之前定义的规则，一直显示根路由.
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      isHidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      isHidden: true,
    },
  },
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
  {
    // 统一处理
    path: "/*",
    redirect: "/404",
    meta: {
      isHidden: true,
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

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// 重置路由
export function resetRouter() {
  const permissionStore = usePermissionStore();
  permissionStore.routes.forEach((route) => {
    const name = route.name;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
