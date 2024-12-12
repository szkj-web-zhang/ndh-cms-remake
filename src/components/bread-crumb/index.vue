<template>
  <div class="bread-crumb card flex al-c jc-sb">
    <div class="list flex al-c">
      <div class="item fd-r" v-for="item in showList" :key="item.label">
        <span @click="item.callback?.()">{{ item.label }}</span>
        <span class="space flex-inline al-c jc-c">/</span>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
interface PropsType {
  list: {
    label: string;
    callback?: () => void;
    isShow?: boolean;
  }[];
}

const props = defineProps<PropsType>();
// 展示的面包屑列表
const showList = computed(() => props.list.filter(i => i.isShow !== false));
</script>

<style lang="scss" scoped>
.bread-crumb {
  min-height: 72px;
  margin-bottom: 16px;
  padding: 0 16px;
}

.list {
  height: 26px;
  .item {
    height: 100%;
    font-family: PR;
    font-size: 14px;
    color: var(--text-color-v3);
    line-height: 26px;
    .space {
      user-select: none;
    }
    > span {
      height: 100%;
      margin: 0 4px;
    }
    &:last-child {
      font-family: PM;
      font-size: 18px;
      color: var(--text-color-v1);
      > span:last-child {
        display: none;
      }
    }
    &:not(:last-child) > span:first-child {
      cursor: pointer;
    }
  }
}
</style>
