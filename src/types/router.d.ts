import "vue-router";
import { Router } from "@/stores/interface";

declare module "vue-router" {
  // 自定义router meta的类型
  interface RouteMeta {
    permis: string[];
    activeMenu?: string;
  }
}
