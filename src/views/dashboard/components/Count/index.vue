<template>
  <el-card shadow="hover" :body-style="{ width: '100%' }">
    <div>
      <div>{{ item.title }}</div>
      <CountUp :count-up="item.count" />
      <div>{{ item.tip }}</div>
      <div></div>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="Count">
import { toRefs } from "vue";
import CountTo from "./CountTo.vue";
import CountUp from "./CountUp.vue";

const props = defineProps<{
  item: {
    count: number;
    title: string;
    icon: string;
    [key: string]: any;
  };
}>();
let { item } = toRefs(props);
</script>

<style scoped lang="scss"></style>
