import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { staticRouter } from "./modules/static-route";
import { useUserStore } from "@/stores/modules/user";
import NProgress from "@/utils/nprogress";
import { useMenuStore } from "@/stores/modules/menu";
import { initDynamicRoute } from "./modules/dynamic-route";

const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * 路由重置
 */
const resetRouter = () => {
  const menuStore = useMenuStore();
  menuStore.flatRouterGet.forEach(i => {
    const { name } = i;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const menuStore = useMenuStore();

  NProgress.start();

  const redirectToLogin = () => next({ path: "/login", replace: true });

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.satoken) {
    if (to.path.toLocaleLowerCase() !== "/login") {
      return redirectToLogin();
    }
    return next();
  }

  // 访问登陆页时，有Token就在当前页面，没有Token重置路由到登陆页
  if (to.path.toLocaleLowerCase() === "/login") {
    resetRouter();
    return next(from.fullPath);
  }

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!menuStore.router.length) {
    try {
      await initDynamicRoute();
      return next({ ...to, replace: true });
    } catch (err) {
      return redirectToLogin();
    }
  }

  // 如果跳转到主页，重定向到第一个标签页
  if (to.path.toLocaleLowerCase() === "/layout") {
    const tabStr = window.localStorage.getItem("ndh-tabs");
    if (tabStr && JSON.parse(tabStr).tabs.length) {
      const tabs = JSON.parse(tabStr).tabs;
      return next({ path: tabs[0].path, replace: true });
    } else {
      const firstRoute = menuStore.router[0];
      if (firstRoute.meta.type === 1 && firstRoute.children?.length) {
        return next({ path: firstRoute.children?.[0].path, replace: true });
      }
    }
  }

  next();
});

/**
 * 路由跳转错误
 */
router.onError(() => NProgress.done());

/**
 * 路由跳转结束
 */
router.afterEach(() => NProgress.done());

export default router;
