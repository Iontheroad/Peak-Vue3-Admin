<template>
  <div class="tableOneRowCheck_box">
    <!-- 搜索 -->
    <div class="box_search"></div>
    <!-- 主体 -->
    <el-card class="box_main">
      <!-- 操作栏 -->
      <div class="main_action">
        <div class="action_left">
          <el-button type="primary" :icon="CirclePlus">新增</el-button>
          <el-button type="danger" :icon="Delete" plain>批量删除</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="main_table">
        <el-form ref="formRef" :model="formData">
          <el-table
            :data="formData.tableData"
            tooltip-effect="dark"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" min-width="60"></el-table-column>
            <el-table-column label="姓名" min-width="120">
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`tableData.${$index}.name`"
                  :rules="rules.name"
                >
                  <el-input
                    v-if="row.isEditor"
                    type="text"
                    placeholder="输入姓名"
                    v-model.trim="row.name"
                  ></el-input>
                  <span v-else>{{ row.name }}</span>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              label="身份证号"
              show-overflow-tooltip
              min-width="220"
            >
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`tableData.${$index}.idCard`"
                  :rules="rules.idCard"
                >
                  <el-input
                    v-if="row.isEditor"
                    type="text"
                    placeholder="输入身份证号"
                    v-model.trim="row.idCard"
                    :maxlength="18"
                  ></el-input>
                  <span v-else>{{ row.idCard }}</span>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              label="手机号码"
              show-overflow-tooltip
              min-width="160"
            >
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`tableData.${$index}.mobile`"
                  :rules="rules.mobile"
                >
                  <el-input
                    v-if="row.isEditor"
                    type="text"
                    placeholder="输入手机号码"
                    v-model.trim="row.mobile"
                    :maxlength="11"
                  ></el-input>
                  <span v-else>{{ row.mobile }}</span>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip min-width="120">
              <template #default="{ row, $index }">
                <el-button
                  v-if="row.isEditor"
                  type="success"
                  text
                  @click="complete(formRef, $index, row)"
                >
                  完成
                </el-button>
                <el-button type="info" text v-else @click="edit(row)"
                  >编辑</el-button
                >
                <!-- <el-button type="text" @click="remove(formRef, $index, row)">
          删除
        </el-button> -->
                <el-popconfirm
                  confirm-button-text="确定"
                  confirm-button-type="danger"
                  cancel-button-text="取消"
                  icon-color="#f62226"
                  title="是否确定删除该条数据?"
                  @confirm="confirmEventRemove(row)"
                  @cancel="cancelEventRemove"
                >
                  <template #reference>
                    <el-button type="danger" text>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <!-- 分页 -->
      <div class="main_pagination"></div>
    </el-card>
  </div>
</template>

<script lang="ts" setup name="TableOneRowCheck">
import { reactive, ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlus, Delete } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
interface TableDataItem {
  name: string;
  idCard: string;
  mobile: string;
  isEditor: boolean;
  myId: number;
}

const formRef = ref<FormInstance>();
const data = reactive({
  formData: {
    tableData: [
      {
        name: "小明",
        idCard: "320602198507252976",
        mobile: "16666666666",
        // my 自定义
        isEditor: true, // 是否可编辑
        myId: 0,
      },
      {
        name: "小刚",
        idCard: "350122197512092590",
        mobile: "",
        // my 自定义
        isEditor: true, // 显示表单(编辑状态)
        myId: 1,
      },
    ] as TableDataItem[],
  },
  rules: {
    name: [
      {
        required: true,
        message: "角色名称不能为空",
        trigger: "blur",
      },
    ],
    idCard: [
      {
        required: true,
        message: "身份证号不能为空",
        trigger: ["blur"],
      },
      {
        pattern:
          /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        message: "请输入正确的身份证号码!",
        trigger: ["blur", "change"],
      },
    ],
    mobile: [
      {
        required: true,
        message: "手机号不能为空",
        trigger: ["blur"],
      },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入13~19开头的号码的11位数号码!",
        trigger: ["blur", "change"],
      },
    ],
  },
});
let { formData, rules } = toRefs(data);
/** 表格多选 */
const handleSelectionChange = (val: []) => {
  console.log(val);
};

/** 点击完成 */
const complete = (
  formEl: FormInstance | undefined,
  index: number,
  row: TableDataItem
) => {
  if (!formEl) return;
  // let arr = [
  //   `tableData.${index}.name`,
  //   `tableData.${index}.idCard`,
  //   `tableData.${index}.mobile`,
  // ];
  // 校验点击哪一行的props
  let propsArr = Object.keys(rules.value).map((key) => {
    return `tableData.${index}.${key}`;
  });

  formEl.validateField(
    //这里要放数组,数组中写上要校验的props字段
    propsArr,
    async (isValid) => {
      // console.log(isValid);
      if (isValid) {
        // console.log(`第${index}行数据校验完成`);
        row.isEditor = false;
        ElMessage.success({
          message: "编辑成功",
          showClose: true,
        });
      } else {
        //校验不通过走这里
        // console.log("没通过");
        ElMessage.warning({
          message: "校验未通过,请按规范输入！",
          showClose: true,
        });
        return false;
      }
    }
  );
};

/** 点击编辑 */
const edit = (row: TableDataItem) => {
  row.isEditor = true;
};

/** 确定 删除 */
const confirmEventRemove = (row: TableDataItem) => {
  data.formData.tableData = data.formData.tableData.filter(
    (item) => item.myId != row.myId
  );
  ElMessage.success({
    message: "删除成功",
    showClose: true,
  });
};
/** 取消删除 */
const cancelEventRemove = () => {
  ElMessage.info({
    message: "取消删除",
    showClose: true,
  });
};
</script>

<style scoped lang="scss">
.tableOneRowCheck_box {
  .box_main {
    .main_action {
      .action_left {
        display: flex;
      }
    }

    // 表格
    .main_table {
      margin: 10px 0px;
    }
  }
}
</style>
