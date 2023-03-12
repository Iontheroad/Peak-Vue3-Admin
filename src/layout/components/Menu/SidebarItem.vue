<script setup lang="ts" name="SideBarItem">
// 组件
import AppLink from "./Link.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";

// api
import path from "path-browserify"; // vite需要使用该插件
import { ref } from "vue";
import { RouteRecordRaw } from "vue-router"; // RouteRecordSingleView
import { generateTitle } from "@/utils/i18n";
import { isExternal } from "@/utils/validate";

const props = defineProps<{
  item: RouteRecordRaw;
  basePath: string;
  isNest?: boolean;
}>();

/* 该变量主要存储item下一个或者零个子路由的路由信息
 *    有一个子路由记录这一个子路由信息;
 *    没有子路由记录父路由(item)信息多一个noShowingChildren:true; 属性;
 */
const onlyOneChild = ref();
/**
 * 遍历接收的 item(每一项根路由)，得出嵌套的子路由情况:
 * 一个或零个：true
 * 两个及以上：false
 * @param children：item.children
 * @param parent：item
 */
function hasOneShowingChild(
  children: RouteRecordRaw[] | undefined,
  parent: RouteRecordRaw
) {
  // 取不到子路由就给个空数组
  if (!children) {
    children = [];
  }

  //  遍历子路由集合，过滤掉需要隐藏的子路由
  const showingChildren = children.filter((item: any) => {
    if (item.meta && item.meta.isHidden) {
      return false;
    } else {
      // 如果只有一个子显示，则使用
      // 记录只有一个子路由的路由信息
      onlyOneChild.value = item;
      return true;
    }
  });

  // 当只有一个子路由时，取该子路由信息
  if (showingChildren.length === 1) {
    return true;
  }

  // 没有要显示的子路由器，则取父路由信息
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
}

// 拼接父子路径
function resolvePath(routePath: string) {
  // 检测子路由路径开头
  if (isExternal(routePath)) {
    return routePath;
  }
  // 检测父路由路径开头
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
}
</script>

<template>
  <!-- 如果路由的isHidden属性为true就不渲染这个菜单 -->
  <div v-if="!item?.meta?.isHidden">
    <!--
      当item的子路由为1个或者0个时该函数返回true
      并且&&
      (
      onLyOneChild.children为false(item为1个子路由时该子路由不能有children属性)
          或者||
      onlyOneChild.onShowingChildren为true(item为0个子路由时才有该属性)
      )
      并且&&
      父路由设置的属性meta.isAlwaysShow(该属性如果为false，item的子路由为1个时子路由做为根目录 \ \如果为true不管有几个子路由都把父路由作为根目录)
    -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item?.meta?.isAlwaysShow
      "
    >
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 一个子路由时这个css类生效： submenu-title-noDropdown， 就是根菜单的移除背景色 -->
        <!-- 默认插槽的内容 -->
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <SvgIcon
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :icon-name="onlyOneChild.meta.icon"
          />
          <template #title>
            <!-- 国际化 -->
            {{ generateTitle(onlyOneChild.meta.title) }}
          </template>
        </el-menu-item>
      </AppLink>
    </template>

    <!-- 为多个子路由时-->
    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <!-- 根菜单 -->
      <template v-slot:title>
        <!-- 组件插槽 -->
        <SvgIcon
          v-if="item.meta && item.meta.icon"
          :icon-name="item?.meta.icon as string"
        />
        <span v-if="item.meta && item.meta.title">
          {{ generateTitle(item.meta.title) }}
        </span>
      </template>
      <!--
      遍历item的子菜单集合
        拿到每一项子菜单信息传入item，递归嵌套该组件
          base-path:是跟当前传入的item路由的path拼接的完整路径
      -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<!--
<页面逻辑:仅供参考>
  从父级组件(Sidebar)传入路由规则集合开始的流程：
    该组件就是： 通过传入的item(也就是每一个路由项数据的根路由)区分出是否嵌套子路由：
      嵌套零个：
        若传入的路由没有嵌套子路由就把传入的路由信息(item)通过spread扩展运算组合一个新的对象并用onlyOneChild属性存储(本质就是传入的路由信息item)；
        生产的新的路由信息的path属性值为空(便于使用resolve方法和item.path拼接新路径)，并多了个noShowingChildren属性用来标记是零嵌套；
      嵌套一个：
        如果嵌套一个子路由，默认就把这一个作为根目录并用onlyOneChild属性存储记录(可以通过alwaysShow属性调整)，本质就是用这个嵌套的路由信息渲染；
      嵌套两个及以上：
        先渲染出当前路由(根路由)；
        然后遍历子路由再次调用该组件把子路由信息传入；
          传入的还有当前路由路径和子路由路径拼接的完成路径(base-path)；
        转入后再次区分是否嵌套子路由(再次走一遍流程)；
-->
