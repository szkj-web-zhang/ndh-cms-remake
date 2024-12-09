import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { staticRouter } from "./modules/static-route";
import { useUserStore } from "@/stores/modules/user";
import NProgress from "@/utils/nprogress";

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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  NProgress.start();

  // 访问登陆页时，有Token就在当前页面，没有Token重置路由到登陆页
  if (to.path.toLocaleLowerCase() === "/login") {
    if (userStore.satoken) return next(from.fullPath);
    // resetRouter();
    return next();
  }

  // 判断是否有 Token，没有重定向到 login 页面
  if (!userStore.satoken) {
    return next({ path: "/login", replace: true });
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
