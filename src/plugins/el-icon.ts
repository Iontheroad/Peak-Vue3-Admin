/**
 * 注册全局组件
 */

import * as ElIcons from "@element-plus/icons-vue";
export default {
  install: (app: { component: (arg0: any, arg1: any) => void }) => {
    for (const key in ElIcons) {
      const componentConfig = (ElIcons as any)[key];
      app.component(componentConfig.name, componentConfig);
    }
  },
};
