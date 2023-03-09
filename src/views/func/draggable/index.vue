<template>
  <el-card shadow="hover" header="vuedraggable 可以拖拽组件">
    <draggable
      class="card grid-container"
      v-model="gridList"
      item-key="id"
      animation="300"
      chosenClass="chosen"
      forceFallback="true"
    >
      <template #item="{ element }">
        <div class="item" :style="element.bg">
          {{ element.num }}
        </div>
      </template>
    </draggable>
  </el-card>
</template>

<script setup lang="ts" name="Draggable">
import { ref } from "vue";
import draggable from "vuedraggable/src/vuedraggable";

let gridList = ref([
  {
    id: 1,
    num: 1,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 2,
    num: 2,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 3,
    num: 3,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 4,
    num: 4,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 5,
    num: 5,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 6,
    num: 6,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 7,
    num: 7,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 8,
    num: 8,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 9,
    num: 9,
    bg: {
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
]);
</script>

<style scoped lang="scss">
// @import "./index.scss";
.grid-container {
  height: 100%;
  display: grid;
  grid-template-rows: 33.3% 33.3% 33.3%;
  grid-template-columns: 33.3% 33.3% 33.3%;
  .item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    color: #ffffff;
    cursor: move;
    border: 1px solid #e5e4e9;
  }
}
// 拖动的元素的样式
.chosen {
  border: 2px solid rgb(100, 82, 82) !important;
}
</style>
