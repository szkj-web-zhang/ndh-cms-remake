<template>
  <div :class="`${outerClass} flex al-c jc-c`" :style="{ width: outerSize, height: outerSize }">
    <svg
      class="svg-icon"
      aria-hidden="true"
      :style="{
        width: iconSize,
        height: iconSize,
        cursor: pointer ? 'pointer' : 'default'
      }"
    >
      <use :xlink:href="`#${name}`" :fill="color" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  outerClass?: string; // 外层盒子类名
  name?: string; // icon名称
  color?: string; // 自定义颜色
  size?: string | number; // 自定义尺寸
  outerSize?: number | string; // 外层尺寸
  pointer?: boolean; // 是否为点击样式点击
}

const props = withDefaults(defineProps<Props>(), {
  outerSize: 24,
  color: "#333",
  pointer: true,
  outerClass: ""
});
// 外层盒子宽高计算
const outerSize = computed(() => {
  return props.outerSize.toString().includes("px") ? props.outerSize : props.outerSize + "px";
});
// icon大小计算
const iconSize = computed(() => {
  return props.size?.toString().includes("px") ? props.size : props.size + "px";
});
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 100%;
  height: 100%;
}
</style>
