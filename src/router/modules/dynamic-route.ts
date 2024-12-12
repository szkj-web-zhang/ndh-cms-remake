import { useMenuStore } from "@/stores/modules/menu";
import { useUserStore } from "@/stores/modules/user";
import router from "..";
import { RouteRecordRaw } from "vue-router";

// 引入pages文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/layout/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRoute = async () => {
  const userStore = useUserStore();
  const menuStore = useMenuStore();
  try {
    await menuStore.getDynamicMenu();
    // 1. 是否需要判断后端菜单返回为空做无权限返回登录处理
    // 2. 遍历router，通过remark字段做文件路径映射，动态加载路由
    menuStore.flatRouterGet.forEach(item => {
      item.children && delete item.children;
      const folder = item.meta.remark;
      item.component = modules[`/src/views/layout/${folder}/index.vue`];
      router.addRoute("layout", item as unknown as RouteRecordRaw);
    });
  } catch (err: any) {
    userStore.clearUserInfo();
    router.push("/login");
  }
};
