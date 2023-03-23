<template>
  <div class="tableAllCheck_box">
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
            ref="multipleTable"
            :data="formData.tableData"
            tooltip-effect="dark"
            border
            style="width: 100%"
          >
            <el-table-column type="selection" width="70"></el-table-column>
            <el-table-column label="姓名" min-width="120">
              <template #default="{ row, $index }">
                <el-form-item
                  :prop="`tableData.${$index}.name`"
                  :rules="rules.name"
                >
                  <el-input
                    type="text"
                    placeholder="输入姓名"
                    v-model.trim="row.name"
                  ></el-input>
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
                    type="text"
                    placeholder="输入身份证号"
                    v-model.trim="row.idCard"
                  ></el-input>
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
                    type="tel"
                    placeholder="输入手机号码"
                    v-model.trim="row.mobile"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
              <template v-slot:default="{ row }">
                <el-popconfirm
                  confirm-button-text="确定"
                  cancel-button-text="取消"
                  :icon="InfoFilled"
                  icon-color="#626AEF"
                  title="是否确定删除该条数据?"
                  @confirm="confirmEvent(row)"
                  @cancel="cancelEvent"
                >
                  <template #reference>
                    <el-button type="danger" text>删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="table_footer">
            <el-button
              type="primary"
              :disabled="formData.tableData.length == 0"
              class="submit"
              @click="submitForm(formRef)"
            >
              确认提交
            </el-button>
            <el-button type="warning" @click="resetForm(formRef)"
              >重置</el-button
            >
          </div>
        </el-form>
      </div>
      <!-- 分页 -->
      <div class="main_pagination"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { reactive, toRefs, ref } from "vue";
import { InfoFilled, CirclePlus, Delete } from "@element-plus/icons-vue";

interface TableDataItem {
  id: number | string;
  name: string;
  idCard: string;
  mobile: string;
}

export default {
  name: "TableAllCheck",
  // components: { CirclePlus, Delete },
  setup() {
    const formRef = ref();
    const data = reactive({
      formData: {
        tableData: [
          {
            id: "1",
            name: "",
            idCard: "",
            mobile: "",
          },
          {
            id: "2",
            name: "",
            idCard: "",
            mobile: "",
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
            message: "身份证不能为空",
            trigger: ["blur"],
          },
          {
            pattern:
              /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请输入正确身份证号码",
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur",
          },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: ["blur", "change"],
          },
        ],
      },
    });

    /** 确定删除 */
    const confirmEvent = (row: TableDataItem) => {
      data.formData.tableData = data.formData.tableData.filter(
        (item) => item.id != row.id
      );
      ElMessage.success({
        message: "删除成功",
        showClose: true,
      });
    };

    /** 取消删除 */
    const cancelEvent = () => {
      ElMessage.info({
        message: "取消删除",
        showClose: true,
      });
    };

    /** 提交 */
    const submitForm = (formEl: FormInstance) => {
      if (!formEl) return;
      formEl.validate((valid, invalidFields) => {
        if (valid) {
          console.log("通过");
          ElMessage.success({
            message: "提交成功",
            showClose: true,
          });
        } else {
          console.log("未通过", invalidFields);
        }
      });
    };

    /**
     * 重置
     */
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    return {
      formRef,
      ...toRefs(data),
      submitForm,
      resetForm,
      confirmEvent,
      cancelEvent,
      InfoFilled,
      CirclePlus,
      Delete,
    };
  },
};
</script>

<style scoped lang="scss">
.tableAllCheck_box {
  .box_main {
    .main_action {
      .action_left {
        display: flex;
      }
    }

    // 表格
    .main_table {
      margin: 10px 0px;
      .table_footer {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 5px;
      }
    }
  }
}
</style>
