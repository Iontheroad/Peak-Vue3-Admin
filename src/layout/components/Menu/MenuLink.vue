<script lang="ts" setup name="MenuLink">
import { computed } from "vue";
import { isExternal } from "@/utils/validate";
import { useRouter } from "vue-router";

import { useAppStore } from "@/store/modules/app";
const appStore = useAppStore();

const sidebar = computed(() => appStore.sidebar);
const device = computed(() => appStore.device); //

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});

const router = useRouter();
function push() {
  if (device.value === "mobile" && sidebar.value.opened == true) {
    appStore.closeSideBar(false);
  }
  router.push(props.to).catch((err) => {
    console.error(err);
  });
}
</script>

<template>
  <!-- 是链接就用a标签 -->
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>
