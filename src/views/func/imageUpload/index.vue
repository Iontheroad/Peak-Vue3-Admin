<template>
  <div>
    图片上传

    <div>
      <MyUpload />
    </div>
  </div>
</template>

<script lang="ts" setup name="ImageUpload">
import { defineAsyncComponent } from "vue";
// const MyUpload = defineAsyncComponent(
//   () => import("@/components/MyUpload/index.vue")
// );
import MyUpload from "@/components/MyUpload/index.vue";
</script>

<style lang="scss" scoped></style>
