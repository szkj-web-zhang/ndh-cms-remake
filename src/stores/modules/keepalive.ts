import { defineStore } from "pinia";
import { ref } from "vue";

export const useKeepaliveStore = defineStore("ndh-keepalive", () => {
  const rules = ref<string[]>([]);

  // ACTIONS
  // 添加缓存规则
  async function handleAddRules(name: string) {
    !rules.value.includes(name) && rules.value.push(name);
  }
  // 移出缓存规则
  async function handleRemoveRule(name: string) {
    rules.value = rules.value.filter(i => i !== name);
  }
  // 重置缓存规则
  async function handleRulesReset(res: string[]) {
    rules.value = res;
  }

  return {
    rules,
    handleAddRules,
    handleRemoveRule,
    handleRulesReset
  };
});
