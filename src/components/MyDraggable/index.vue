<template>
  <!-- 封装拖动组件 -->
  <draggable
    class="grid-container"
    v-model="gridList"
    item-key="id"
    animation="300"
    chosenClass="chosen"
    forceFallback="true"
    @change="changeMoved"
    :style="gridContainerStyle"
  >
    <template #item="{ element }">
      <div class="item" :style="element.myStyle">
        <slot :element="element">{{ element.id }}</slot>
        <!-- 默认插槽 -->
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts" name="MyDraggable">
import { computed } from "vue";
import draggable from "vuedraggable/src/vuedraggable";

export interface GridItem {
  id: number | string;
  ss?: number;
  [key: string]: any;
}
export interface GridContainerStyle {
  // gridTemplateRows: string;
  [key: string]: any;
}
export interface Props {
  gridList?: GridItem[];
  gridContainerStyle?: GridContainerStyle;
}

// 接收属性
const props = withDefaults(defineProps<Props>(), {
  gridList: (): GridItem[] => [
    {
      id: 1,
      myStyle: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      id: 2,
      myStyle: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      id: 3,
      myStyle: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      id: 4,
      myStyle: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      id: 5,
      myStyle: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
    {
      id: 6,
      myStyle: {
        backgroundColor: `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)})`,
      },
    },
  ],
  gridContainerStyle: (): GridContainerStyle => ({
    // 默认三行三列
    gridTemplateRows: "33.3% 33.3% 33.33%",
    gridTemplateColumns: "33.3% 33.3% 33.3%",
  }),
});
// 接收事件
const emits = defineEmits<{
  (e: "changeGridList", newList: GridItem[]): void;
}>();

const gridContainerStyle = computed(() => props.gridContainerStyle);

/**
 * 计算属性 获取和修改
 */
const gridList = computed({
  get() {
    return props.gridList;
  },
  set(newVal) {
    emits("changeGridList", newVal);
  },
});

interface Moved {
  element: GridItem;
  newIndex: number;
  oldIndex: number;
}
/**
 * 移动
 */
const changeMoved = (item: { moved: Moved }) => {
  // console.log(item);
};
</script>

<style scoped lang="scss">
.grid-container {
  display: grid;
  // grid-template-rows: 33.3% 33.3% 33.3%;
  // grid-template-columns: 33.3% 33.3% 33.3%;
  height: 100%;
  .item {
    box-sizing: border-box !important;
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
  box-sizing: border-box !important;
  border: 2px solid var(--el-color-primary) !important;
  //  background: var(--el-color-primary);
}
</style>
