import { Directive, createApp } from "vue";
import App from "./App.vue";
import pinia from "@/store";
import i18n from "@/lang"; // 国际化
import "./mocks/index.ts"; // 使用mock
const app = createApp(App);
/* 路由 */
import router from "@/routers";
// import "@/routers/auth"; // 路由拦截认证

/* element */
import "element-plus/dist/index.css";
import "@/styles/index.scss";

//svg icons
import "virtual:svg-icons-register"; // 引入注册脚本

/* 注册全局指令 */
import * as directive from "@/directive/v-hasPerm";
Object.keys(directive).forEach((key) => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

app.use(i18n);
app.use(pinia);
app.use(router);
app.mount("#app");
