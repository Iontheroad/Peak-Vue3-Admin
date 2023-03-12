<script setup lang="ts" name="Language">
import SvgIcon from "@/components/SvgIcon/index.vue";
import { useGlobalStore } from "@/store";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const globalStore = useGlobalStore();
const i18n = useI18n();
const language = computed(() => globalStore.language);
function handleSetLanguage(lang: string) {
  i18n.locale.value = lang;
  globalStore.changeLanguage(lang);
}
</script>

<template>
  <div class="language">
    <el-dropdown trigger="click" @command="handleSetLanguage">
      <SvgIcon class="icon" icon-name="Header_language" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            :disabled="language && language === 'zh-cn'"
            command="zh-cn"
          >
            简体中文
          </el-dropdown-item>
          <el-dropdown-item :disabled="language === 'en'" command="en">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.language {
  margin-right: 20px;
  display: flex;
  align-items: center;

  .icon {
    font-size: 26px;
    cursor: pointer;
    outline: none;
    line-height: 50px;
  }
}
</style>
