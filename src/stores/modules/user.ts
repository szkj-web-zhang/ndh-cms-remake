import { defineStore } from "pinia";
import { StoreData } from "../interface";
import { User } from "@/api/modules/login/type";
import piniaPersistConfig from "../helper/persist";
import { ref } from "vue";

export const useUserStore = defineStore(
  "ndh-user",
  () => {
    const satoken = ref("");
    const userInfo = ref<StoreData.UserStore["userInfo"]>();
    // methods
    // 存储用户token
    const setToken = (val: string) => {
      satoken.value = val;
    };
    // 存储用户信息
    const setUserInfo = (res: User.Info) => {
      userInfo.value = res;
    };
    // 清除用户信息
    const clearUserInfo = () => {
      userInfo.value = undefined;
      satoken.value = "";
      window.localStorage.clear();
    };
    return {
      satoken,
      userInfo,
      setToken,
      setUserInfo,
      clearUserInfo
    };
  },
  {
    persist: piniaPersistConfig("ndh-user")
  }
);
