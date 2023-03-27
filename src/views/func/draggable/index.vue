<template>
  <el-card
    class="card_box"
    :body-style="{ height: '100%' }"
    shadow="hover"
    header="vuedraggable 可以拖拽组件"
  >
    <MyDraggable :gridList="gridList" v-on:changeGridList="changeGridList">
      <template v-slot="{ element }">
        <div>{{ element.id }}</div>
      </template>
    </MyDraggable>
  </el-card>
</template>

<script setup lang="ts" name="Draggable">
import { ref } from "vue";
import MyDraggable, { type GridItem } from "@/components/MyDraggable/index.vue";
// 默认公共样式
let commonStyle = {
  backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
    Math.random() * 255
  )}, ${Math.ceil(Math.random() * 255)})`,
};

// 数据
let gridList = ref<GridItem[]>([
  {
    id: 1,
    myStyle: {
      ...commonStyle,
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 2,
    myStyle: {
      ...commonStyle,
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 3,
    myStyle: {
      ...commonStyle,
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 4,
    myStyle: {
      ...commonStyle,
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 5,
    myStyle: {
      ...commonStyle,
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
  {
    id: 6,
    myStyle: {
      ...commonStyle,
      backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
        Math.random() * 255
      )}, ${Math.ceil(Math.random() * 255)})`,
    },
  },
]);

/**
 * 回调修改 gridList
 * @param newList
 */
const changeGridList = (newList: GridItem[]) => {
  gridList.value = newList;
};
</script>

<style scoped lang="scss">
.card_box {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
