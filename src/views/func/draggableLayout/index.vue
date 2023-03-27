<template>
  <div class="grid-layout-container">
    <el-card class="card_box" body-style="{height:'100%'}" shadow="hover">
      <template v-slot:header> vue-grid-layout 可以拖拽布局组件</template>
      <el-alert
        title="`vue-grid-layout`，项目地址：https://github.com/jbaysolutions/vue-grid-layout"
        type="success"
        :closable="false"
      ></el-alert>
      <grid-layout
        v-model:layout="state.layouts"
        :col-num="10"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >
        <grid-item
          v-for="item in state.layouts"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
        >
          <div class="item-div" :style="item.bg">
            <div>
              <span>{{ item.i }}</span>
              <span>{{ item.itemInfo?.hot_name }} </span>
            </div>
            <img
              v-if="item.itemInfo"
              :src="item.itemInfo?.hot_img_url"
              alt=""
            />
          </div>
        </grid-item>
      </grid-layout>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="DraggableLayout">
import { reactive } from "vue";

/**
 * 比如父组件划分 10列
 *  子项
 *  @ x:第几列
 *  @ y:第几行
 *  @ w:宽度(也就是占几列)
 *  @ h:高度(也就是占几行)
 *  @ i:id
 */
// 定义变量内容
const state = reactive({
  layouts: [
    {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      i: "0",
      bg: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      x: 2,
      y: 0,
      w: 2,
      h: 4,
      i: "1",
      bg: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      x: 4,
      y: 0,
      w: 2,
      h: 5,
      i: "2",
      bg: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
      itemInfo: {
        hot_name: "琅琊榜",
        hot_img_url:
          "https://img.ynajax.com:2391/storage/images/2022/10/621/16e44709376a30016f9b04185a069b8c.jpg",
      },
    },
    {
      x: 6,
      y: 0,
      w: 2,
      h: 3,
      i: "3",
      bg: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
      itemInfo: {
        hot_name: "琅琊榜",
        hot_img_url:
          "https://img.ynajax.com:2391/storage/images/2022/10/621/16e44709376a30016f9b04185a069b8c.jpg",
      },
    },
    {
      x: 8,
      y: 0,
      w: 2,
      h: 3,
      i: "4",
      bg: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      x: 0,
      y: 10,
      w: 2,
      h: 5,
      i: "6",
      bg: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
  ],
});
</script>

<style scoped lang="scss">
.grid-layout-container {
  flex: 1;
  .card_box {
    height: 100%;
  }

  :deep(.vue-grid-item) {
    background-color: var(--el-color-primary);
    color: var(--el-color-white);
    &.vue-grid-placeholder {
      // 拖动元素的原位置的阴影样式
      background: var(--el-color-primary);
      // opacity: 0.2;
      // transition-duration: 100ms;
      // z-index: 2;
      // -webkit-user-select: none;
      // -moz-user-select: none;
      // -ms-user-select: none;
      // -o-user-select: none;
      // user-select: none;
    }
    & > .item-div {
      position: relative;
      width: 100%;
      height: 100%;
      & > div {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        z-index: 1;
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 0;
      }
    }
  }
}
</style>
