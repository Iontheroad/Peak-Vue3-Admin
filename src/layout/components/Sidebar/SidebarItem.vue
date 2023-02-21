<script setup lang="ts" name="SideBarItem">
import AppLink from "./Link.vue";
import SvgIcon from "@/components/SvgIcon/index.vue";
import { RouteRecordRaw } from "vue-router"; // RouteRecordSingleView
import { generateTitle } from "@/utils/i18n";
// import { routeOptionsType } from "@/routers";
import path from "path-browserify"; // vite需要使用该插件
import { isExternal } from "@/utils/validate";
import { ref } from "vue";
const props = defineProps<{
  item: RouteRecordRaw;
  basePath: string;
  isNest?: boolean;
}>();
// const props = defineProps({
//   item: {
//     type: Object,
//     required: true,
//   },
//   basePath: {
//     type: String,
//     required: true,
//   },
//   isNest: {
//     type: Boolean,
//     required: false,
//   },
// });

const onlyOneChild = ref(); // 记录一个或零个子路由数据
// 判断子路由数量得出 true还是false
function hasOneShowingChild(
  children: RouteRecordRaw[] | undefined,
  parent: RouteRecordRaw
) {
  if (!children) {
    children = [];
  }

  //  遍历子路由集合，过滤掉需要隐藏的子路由
  const showingChildren = children.filter((item: any) => {
    if (item.meta && item.meta.isHidden) {
      return false;
    } else {
      // Temp set(will be used if only has one showing child)
      // 临时设置(如果只有一个子显示，则使用)
      onlyOneChild.value = item;
      return true;
    }
  });

  // When there is only one child router, the child router is displayed by default
  // 当只有一个子路由器时，默认显示子路由器
  if (showingChildren.length === 1) {
    return true;
  }

  // Show parent if there are no child router to display
  // 如果没有要显示的子路由器，则显示父路由器
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
  <!-- 如果路由的hidden属性为true就不渲染这个项侧边栏菜单导航 -->
  <div v-if="!item?.meta?.isHidden">
    <!--
      当子路由为1个或者0个时该函数返回true
      并且&&
      onLyOneChild.children为false(1个子路由时) 或者||  onlyOneChild.onShowingChildren为true(是0个子路由时)
      并且&&
      父路由设置的属性alwaysShow(该属性如果为false子路由为1个或0个时子路由为根目录,多个时父级为根目录\\如果为true不管有没有子路由都把父路由作为根目录)
    -->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item?.meta?.isAlwaysShow
      "
    >
      <!-- 没有子路由时且上层没有meta属性就不会渲染了 空标签
        没有子路由时 onlyOneChild属性包含的是上级路由的信息
      -->
      <!--
        没有子路由但有meta属性或者一个子路由 继续渲染
          本质就是：
            有一个子路由就取这一个子路由的数据
            没有就是取传入的路由数据拼接一个新对象(这个传入的必须包含meta属性，不然不能往下渲染)
      -->
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- 一个子路由时这个css类生效： submenu-title-noDropdown -->
        <!-- 默认插槽的内容 -->
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <!-- 通过render函数渲染 icon和title
          这俩属性为空就不渲染-->
          <!-- <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          /> -->
          <SvgIcon
            v-if="onlyOneChild.meta && onlyOneChild.meta.icon"
            :icon-name="onlyOneChild.meta.icon"
          />
          <template #title>
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
        <!-- <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        /> -->
        <SvgIcon
          v-if="item.meta && item.meta.icon"
          :icon-name="item.meta.icon as string"
        />
        <span v-if="item.meta && item.meta.title">{{
          generateTitle(item.meta.title)
        }}</span>
      </template>
      <!--
      遍历子菜单集合
        拿到每一项 递归嵌套该组件 并把每一项的路由信息传递进去
          base-path:是跟传入的上层路由(base-path拼接)拼接的完整路径
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

<style scoped></style>
