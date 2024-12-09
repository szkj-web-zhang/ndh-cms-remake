import { RouteRecordRaw } from "vue-router";

export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/layout"
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "login",
      permis: []
    }
  }
];
