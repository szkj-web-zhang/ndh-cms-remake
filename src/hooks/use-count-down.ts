import { tryOnUnmounted } from "@vueuse/core";
import { ref, unref } from "vue";

export const useCountDown = (count: number) => {
  // 记录当前的数字
  const currentCount = ref(count);
  // 记录是否开始计时
  const isStart = ref(false);
  // 存储定时器
  let timerId: ReturnType<typeof setInterval> | null;

  // 清除定时器
  const handleRemoveTimer = () => {
    timerId && window.clearInterval(timerId);
  };

  // 停止计时
  const handleStopTimer = () => {
    isStart.value = false;
    handleRemoveTimer();
    timerId = null;
  };

  // 重置定时器
  const handleResetTimer = () => {
    currentCount.value = count;
    handleStopTimer();
  };

  // 开始计时
  const handleStartTimer = () => {
    if (unref(isStart) || !!timerId) {
      return;
    }
    isStart.value = true;
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        // 计时结束，恢复初始
        handleResetTimer();
      } else {
        currentCount.value -= 1;
      }
    }, 1000);
  };

  // 手动重启定时器
  const handleRestartTimer = () => {
    handleResetTimer();
    handleStartTimer();
  };

  // 组件销毁时初始化定时器
  tryOnUnmounted(() => {
    handleResetTimer();
  });

  return {
    currentCount,
    isStart,
    handleRemoveTimer,
    handleStopTimer,
    handleResetTimer,
    handleStartTimer,
    handleRestartTimer
  };
};
