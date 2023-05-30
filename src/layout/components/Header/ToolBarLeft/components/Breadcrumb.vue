<template>
  <el-breadcrumb class="breadcrumb_container" separator="/">
    <transition-group name="breadcrumb">
      <!-- 遍历点击的路由信息添加面包屑 -->
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <!--情况展现：
          一个：
            就只有首页路由,渲染的首页面包屑不能点击；
          二个：
            只有首页+类似首页菜单的(比如Form菜单)，渲染的只有最后一个不能点击
          两个以上:
            只有首页+其他(就是含有子菜单比如Example), 最后一个不能点击；
        -->
        <span
          v-if="item.redirect == 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
        >
          <SvgIcon
            v-show="themeConfig.isShowBreadcrumbIcon"
            :icon-name="item.meta.icon as string"
          />
          {{ getTranslateLanguage("route." + item.meta.title) }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          <SvgIcon
            v-show="themeConfig.isShowBreadcrumbIcon"
            :icon-name="item.meta.icon as string"
          />
          {{ getTranslateLanguage("route." + item.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup name="Breadcrumb">
import * as pathToRegexp from "path-to-regexp";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";
import { watch, onBeforeMount, Ref, ref, computed } from "vue";

import SvgIcon from "@/components/SvgIcon/index.vue";

import { getTranslateLanguage } from "@/lang/index";
import { useGlobalStore } from "@/store";

const route = useRoute();
const router = useRouter();
const globalStore = useGlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);

// 监听当前路由信息的数据变化
watch(route, (newVal) => {
  if (newVal.path.startsWith("/redirect/")) {
    return;
  }
  getBreadcrumb();
});

onBeforeMount(() => {
  // 组件创建完成获取一次面包屑数据
  getBreadcrumb();
});

let levelList: Ref<RouteLocationMatched[]> = ref([]); // 存储点击的路由信息数据列表
/**
 * 得到面包屑数据
 */
function getBreadcrumb() {
  // 只过滤出有meta和meta.title属性的路由以及不隐藏面包屑的
  let matched = route.matched.filter(
    (item) => item.meta && item.meta.title && !item.meta.isBreadcrumbHidden
  );
  const first = matched[0]; // 拿到第一个跟路由信息

  // 判断第一个路由是不是首页路由
  if (!isHomePage(first)) {
    //不是 就创建个新数组把首页路由添加到数组的第一位
    matched = [
      {
        path: "/dashboard",
        meta: { title: "dashboard", icon: "menu-home" },
      } as any,
    ].concat(matched);
  }

  // 遍历 出最终的路由信息
  levelList.value = matched.filter((item) => {
    /*
          itm.meta 和item.meta.title不会空
          以及item.meta.breadcrumb属性(该属性每个路由都没有都是undefined) 为undefined
          返回true
         */
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
  // console.log(matched, levelList.value);
}

/**
 * 判断是不是 首页路由
 * @param route
 */
function isHomePage(route: RouteLocationMatched) {
  let name = route?.name as string;
  if (!name) {
    // 传入的是空也返回false
    return false;
  }
  // 统一根据地区转为小写对比
  // 相同返回true
  return name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase();
}

/**
 * 点击面包屑跳转时，回填params参数
 * @param path
 */
function pathCompile(path: string) {
  const { params } = route;
  /*  // pathToRegexp.compile()方法的介绍
      var url = "/user/:id/:name"; // /user/10001/bob
      var url2 = "/user/role"; // /user/role
      var data = { id: 10001, name: "bob" };
      console.log(pathToRegexp.compile(url)(data)); // '/user/10001/bob'*/
  var toPath = pathToRegexp.compile(path);
  return toPath(params);
}
/**
 * 点击面包屑跳转
 * @param item
 */
function handleLink(item: any) {
  const { redirect, path } = item;
  // 有重定向，直接跳到重定向
  if (redirect) {
    router.push(redirect);
    return;
  }
  // 没有重定向直接push的
  // 如果是动态路由，需要携带上当前路由的params的数据
  router.push(pathCompile(path));
}
</script>

<style lang="scss" scoped>
.breadcrumb_container.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
