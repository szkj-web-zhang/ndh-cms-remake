import { App, Component, DefineComponent } from "vue";
import CmsIcon from "./cms-icon/index.vue";
import BreadCrumb from "./bread-crumb/index.vue";

type ComponentType = Record<string, Component | DefineComponent>;

// 对象存储全局组件
const globalComponent: ComponentType = {
  CmsIcon,
  BreadCrumb
};

// 注册全局组件
const install = (app: App) => {
  Object.keys(globalComponent).forEach(key => {
    app.component(key, globalComponent[key]);
  });
};

export default { install };
