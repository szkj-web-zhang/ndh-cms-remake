<template>
  <div class="cms-tab">
    <el-tabs
      type="border-card"
      v-model="tabValue"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in tabs"
        :key="item.path"
        :closable="true"
        :label="item.title"
        :name="item.path"
      >
        <template #label>
          {{ item.title }}
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { StoreData } from "@/stores/interface";
import { useTabsStore } from "@/stores/modules/tabs";
import { TabPaneName, TabsPaneContext } from "element-plus";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

// route
const route = useRoute();
const router = useRouter();
// pinia
const tabStore = useTabsStore();
const { tabs } = storeToRefs(tabStore);
// 选中的tab
const tabValue = ref(route.fullPath);

/**
 * 监听路由变化，前进后退保证tab切换
 */
watch(
  () => route.fullPath,
  () => {
    if (route.meta.isFull) return;
    tabValue.value = route.fullPath;
    const tab: StoreData.TabOption = {
      title: route.meta.title as string,
      path: route.fullPath,
      name: route.name as string,
      isKeepAlive: route.meta.isKeepAlive as boolean
    };
    tabStore.handleAddTab(tab);
  }
);

/**
 * 点击tab
 */
const handleTabClick = (res: TabsPaneContext) => {
  const path = res.props.name as string;
  router.push(path);
};

/**
 * 移除tab时
 */
const handleTabRemove = (res: TabPaneName) => {
  tabStore.handleRemoveTab(res as string, res == route.path);
};
</script>

<style lang="scss" scoped>
.cms-tab {
  width: 100%;
  height: 40px;
  box-shadow: var(--shadow-small);
  .el-tabs {
    height: 100%;
    box-sizing: border-box;
    :deep(.el-tabs__content) {
      display: none;
    }
    :deep(.el-tabs__header) {
      height: 100%;
      background-color: var(--bg-color-v1);
      border-bottom: none;
      box-shadow: 0px 1px 4px 0px rgba(20, 56, 102, 0.08);
      .el-tabs__nav-wrap {
        height: inherit;
        margin-bottom: 0;
        .el-tabs__nav-prev,
        .el-tabs__nav-next {
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @at-root {
          &.is-scrollable {
            padding: 0 40px;
          }
        }
      }
      .el-tabs__nav-scroll {
        height: inherit;
        .el-tabs__item {
          max-width: 270px;
          min-width: 144px;
          font-size: 14px;
          color: var(--text-color-v1);
          font-family: PR;
          box-sizing: content-box;
          border: none;
          justify-content: space-between;
          margin-left: 0;
          margin-top: 0;
          padding: 0 12px;
          &::after {
            content: "";
            width: 1px;
            height: 20px;
            background-color: var(--border-color-v1);
            position: absolute;
            top: calc(50% + 1px);
            right: 0;
            transform: translate(0, -50%);
          }
          @at-root {
            &.is-active {
              background-color: var(--color-primary-light);
              border-right-color: transparent;
              border-left-color: transparent;
              position: relative;
              &::before {
                content: "";
                width: 100%;
                height: 2px;
                background-color: var(--color-primary);
                position: absolute;
                left: 0;
                bottom: 0;
              }
            }
          }
        }
      }
      .el-tabs__nav {
        height: inherit;
      }
    }
    @at-root {
      .el-tabs--border-card {
        border: none;
      }
    }
  }
}
</style>
