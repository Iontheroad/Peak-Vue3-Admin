<template>
  <div class="tableCheck_box">
    <el-card>
      <template v-slot:header>
        <div>表格单行校验</div>
      </template>
      <TableOneRowCheck />
    </el-card>
    <el-card>
      <template v-slot:header>
        <div>表格多行校验</div>
      </template>
      <TableMultiRowCheck />
    </el-card>
  </div>
</template>

<script lang="ts" setup name="TableCheck">
import TableMultiRowCheck from "./TableMultiRowCheck.vue";
import TableOneRowCheck from "./TableOneRowCheck.vue";
</script>
<style lang="scss" scoped>
.tableCheck_box {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
