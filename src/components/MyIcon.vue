<template>
  <el-icon :size="size" :color="color">
    <component :is="name"></component>
  </el-icon>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import * as ElIcons from "@element-plus/icons-vue";

export default defineComponent({
  components: ElIcons,
  name: "MyIcons",
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
});
</script>
