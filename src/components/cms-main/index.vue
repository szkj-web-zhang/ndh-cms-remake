<template>
  <cms-tabs />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear mode="out-in" name="fade-transform">
        <keep-alive :include="rules">
          <component :is="componentWrapper(Component, route)" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<script lang="ts" setup>
import { useKeepaliveStore } from "@/stores/modules/keepalive";
import { storeToRefs } from "pinia";
import { h, RendererElement, RendererNode, VNode } from "vue";
import { RouteLocationNormalizedLoadedGeneric } from "vue-router";
import CmsTabs from "../cms-tab/index.vue";
type _Component = VNode<RendererNode, RendererElement, { [key: string]: any }>;
type _Route = RouteLocationNormalizedLoadedGeneric;

// pinia
const { rules } = storeToRefs(useKeepaliveStore());

/**
 * 减少重复创建组件
 */
const wrapperMap = new Map();
const componentWrapper = (component: _Component, route: _Route) => {
  if (!component) return;
  const wrapperName = route.fullPath;
  let wrapper = wrapperMap.get(wrapperName);
  if (!wrapper) {
    wrapper = { name: wrapperName, render: () => h(component) };
    wrapperMap.set(wrapperName, wrapper);
  }
  return h(wrapper);
};
</script>

<style lang="scss" scoped>
.el-main {
  background-color: var(--bg-color-v2);
  overflow: hidden;
  position: relative;
  padding: 16px 20px 20px 20px;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
}

.fade-transform-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
</style>
