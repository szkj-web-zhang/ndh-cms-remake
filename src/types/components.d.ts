/** 全局组件类型声明提示 **/
import CmsIcon from "@/components/cms-icon/index.vue";
import BreadCrumb from "@/components/bread-crumb/index.vue";

declare module "vue" {
  export interface GlobalComponents {
    CmsIcon: typeof CmsIcon;
    BreadCrumb: typeof BreadCrumb;
  }
}

export {};
