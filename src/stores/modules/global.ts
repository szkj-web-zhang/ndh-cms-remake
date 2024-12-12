import { defineStore } from "pinia";
import { ref } from "vue";
import { StoreData } from "../interface";
import { global_navigation_get } from "@/api/modules/login";
import piniaPersistConfig from "../helper/persist";

export const useGlobalStore = defineStore(
  "ndt-global",
  () => {
    const navigation = ref<StoreData.GlobalStore["navigation"]>();

    // ACTION
    async function getNavigation() {
      const res = await global_navigation_get();
      res.code === 200 && (navigation.value = res.data);
    }

    // METHODS
    const clearNavigation = () => {
      navigation.value = undefined;
    };

    return {
      navigation,
      getNavigation,
      clearNavigation
    };
  },
  {
    persist: piniaPersistConfig("ndh-global")
  }
);
