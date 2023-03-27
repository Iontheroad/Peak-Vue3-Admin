<template>
  <el-card class="technologyStack">
    <template #header>
      <div class="card-header">
        <span>技术栈</span>
        <el-button class="button" type="primary" link>更多</el-button>
      </div>
    </template>
    <my-draggable
      :gridList="gridList"
      :grid-container-style="gridContainerStyle"
      @changeGridList="changeGridList"
      class="draggable"
    >
      <template v-slot:default="{ element }">
        <div class="draggable_item">
          <el-icon>
            <SvgIcon :icon-name="element.iconName" />
          </el-icon>
        </div>
      </template>
    </my-draggable>
  </el-card>

  <!-- </el-card> -->
</template>

<script setup lang="ts" name="TechnologyStack">
import SvgIcon from "@/components/SvgIcon/index.vue";
import MyDraggable, { type GridItem } from "@/components/MyDraggable/index.vue";
import { ref } from "vue";
let gridList = ref<GridItem[]>([
  {
    id: 1,
    iconName: "home-vue",
  },
  {
    id: 2,
    iconName: "home-js",
  },
  {
    id: 3,
    iconName: "home-typescript",
  },
  {
    id: 4,
    iconName: "home-git",
  },
  {
    id: 5,
    iconName: "home-node",
  },
  {
    id: 6,
    iconName: "home-element",
  },
]);
let gridContainerStyle = ref({
  gridTemplateRows: "50% 50%",
  gridTemplateColumns: "33.3% 33.3% 33.3%",
});
const changeGridList = (newVal: GridItem[]) => {
  gridList.value = newVal;
};
</script>

<style scoped lang="scss">
.technologyStack {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .draggable {
    height: 200px;
    .draggable_item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #fff;
      // font-size: 60px;
      .el-icon {
        width: 100%;
        height: 100%;
        .svg-icon {
          width: 100%;
        }
      }
    }
  }
}
</style>
