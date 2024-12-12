import { defineStore } from "pinia";
import { ref } from "vue";
import { StoreData } from "../interface";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useKeepaliveStore } from "./keepalive";
import { getUrlWithParams } from "@/utils/router-handler";
import piniaPersistConfig from "../helper/persist";

const keepaliveStore = useKeepaliveStore();

export const useTabsStore = defineStore(
  "ndh-tabs",
  () => {
    const tabs = ref<StoreData.TabsStore["tabs"]>([]);

    // ACTIONS
    // 添加tab
    async function handleAddTab(res: StoreData.TabOption) {
      if (tabs.value.every(i => i.path !== res.path)) {
        tabs.value.push(res);
      }
    }
    // 删除tab
    async function handleRemoveTab(tabPath: string, isCurrent: boolean = true) {
      if (tabs.value.length == 1) {
        ElMessage.warning("至少保留一个页签打开");
        return;
      }
      if (isCurrent) {
        tabs.value.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabs.value[index + 1] || tabs.value[index - 1];
          if (!nextTab) {
            router.push("/layout");
            return;
          }
          router.push(nextTab.path);
        });
      }
      const tabItem = tabs.value.find(i => i.path == tabPath);
      tabItem?.isKeepAlive && keepaliveStore.handleRemoveRule(tabItem.path);
      tabs.value = tabs.value.filter(i => i.path !== tabPath);
    }
    // 清空tab
    async function handleTabsReset(res: StoreData.TabOption[]) {
      tabs.value = res;
    }
    // 设置标签页的标题
    async function handleSetTabTitle(title: string) {
      tabs.value.forEach(item => {
        if (decodeURIComponent(item.path) == getUrlWithParams()) {
          item.title = title;
        }
      });
    }

    return {
      tabs,
      handleAddTab,
      handleRemoveTab,
      handleSetTabTitle,
      handleTabsReset
    };
  },
  {
    persist: piniaPersistConfig("ndh-tabs")
  }
);
