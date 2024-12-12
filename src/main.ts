import { createApp } from "vue";
import App from "./App.vue";
// 全局样式
import "@/styles/global.scss";
import "@/styles/reset.scss";
import "@/styles/var.scss";
import "@/styles/font.scss";
import "@/styles/theme.scss";
// 第三方样式
import "@wangeditor/editor/dist/css/style.css";
// icon
import * as Icons from "@element-plus/icons-vue";
import "@/assets/icon/iconfont.js";
// 引入组件
import GlobalComponents from "@/components/index";
import ElementPlus from "element-plus";
// pinia
import pinia from "@/stores/index";
// 路由
import router from "@/router/index";

const app = createApp(App);

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(pinia).use(router).use(ElementPlus).use(GlobalComponents).mount("#app");
