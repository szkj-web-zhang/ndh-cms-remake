import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { StoreData } from "../interface";
import { getFlatRouterList, getTransferRouter } from "@/utils/router-handler";
import { dynamic_menu_get } from "@/api/modules/login";

export const useMenuStore = defineStore("ndh-menu", () => {
  // state
  const menu = ref<StoreData.MenuStore["menue"]>([]);
  const router = ref<StoreData.MenuStore["router"]>([]);

  // getters
  const flatRouterGet = computed(() => getFlatRouterList(router.value));

  // actions
  async function getDynamicMenu() {
    const res = await dynamic_menu_get();
    if (res.code === 200) {
      menu.value = res.data;
      router.value = getTransferRouter(res.data);
    }
  }

  return {
    menu,
    router,
    flatRouterGet,
    getDynamicMenu
  };
});
