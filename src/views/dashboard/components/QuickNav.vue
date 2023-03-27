<template>
  <!-- 快捷导航 -->
  <el-card class="quick_nav">
    <template #header>
      <div class="card-header">
        <span>快捷导航</span>
      </div>
    </template>
    <el-row>
      <el-col
        :xs="8"
        :sm="12"
        :lg="8"
        v-for="(item, k) in flatMenubarList_getters"
        :key="k"
      >
        <el-popconfirm
          width="200px"
          confirm-button-text="OK"
          cancel-button-text="No"
          :icon="InfoFilled"
          icon-color="#d90e00"
          title="是否跳转?"
          @confirm="goTo(item)"
        >
          <template #reference>
            <el-card
              :body-style="{ paddingLeft: '0px', paddingRight: '0px' }"
              shadow="hover"
              class="nav_box"
            >
              <el-tooltip class="box-item" effect="dark" placement="top-start">
                <template v-if="item.redirect" v-slot:content>根菜单</template>
                <template v-else v-slot:content>子菜单</template>
                <div class="nav">
                  <el-icon>
                    <SvgIcon :icon-name="item.meta?.icon" />
                  </el-icon>
                  <span> {{ item.meta?.title }}</span>
                </div>
              </el-tooltip>
            </el-card>
          </template>
        </el-popconfirm>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts" name="QuickNav">
import { InfoFilled } from "@element-plus/icons-vue";
import { computed } from "vue";
import { usePermissionStore } from "@/store/modules/permission";
import { useRouter } from "vue-router";

const router = useRouter();
const permissionStore = usePermissionStore();
let flatMenubarList_getters = computed(() => {
  return permissionStore.flatMenubarList_getters.filter((tab) => {
    //  过滤掉没有meta, 以及 需要隐藏的路由
    return tab?.meta && !tab?.meta?.isHidden;
  });
});

const goTo = (item: Menu.MenuOptions) => {
  console.log(item);
  item.name && router.push({ name: item.name });
};
</script>

<style scoped lang="scss">
.quick_nav {
  .nav_box {
    .el-card__body {
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
  }
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    cursor: pointer;
  }
}
</style>
