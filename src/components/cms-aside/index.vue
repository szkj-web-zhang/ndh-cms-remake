<template>
  <div class="cms-aside flex fd-c">
    <div class="logo flex">
      <el-image :src="navigation?.browserTitle">
        <template #error>
          <el-image :src="defalutLogo" />
        </template>
      </el-image>
    </div>
    <el-scrollbar>
      <el-menu :default-active="activeMenu" :unique-opened="true" class="outer-menu">
        <cms-menu :depth="1" :list="router" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from "@/stores/modules/menu";
import defalutLogo from "@/assets/images/default_logo.png";
import CmsMenu from "@/components/cms-menu/index.vue";
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

// route
const route = useRoute();
// pinia
const { navigation, router } = storeToRefs(useMenuStore());
// 激活的菜单
const activeMenu = computed(
  () => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string
);
</script>

<style lang="scss" scoped>
@mixin left-box {
  content: "";
  width: 10px;
  height: 20px;
  border-radius: 8px;
  background-color: var(--color-primary);
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translate(0, -50%);
}

.cms-aside {
  width: 100%;
  height: 100%;
  background-color: #292d33;
  transition: width 0.3s ease;
  .logo {
    width: 100%;
    height: 56px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-block: 8px;
    padding-inline: 20px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: fill;
      user-select: none;
    }
  }
}

.outer-menu {
  font-family: PR;
  font-size: 14px;
  background-color: transparent;
  border-right: none;
  :deep(.el-sub-menu) {
    background-color: #292d33;
    .el-sub-menu__title {
      height: 48px;
      color: var(--text-color-v0);
      user-select: none;
      &:hover {
        background-color: #212429;
      }
      .el-icon {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        right: 20px;
        top: calc(50% - 2px);
      }
    }
    .el-menu {
      background-color: transparent;
    }
    &.is-opened {
      background-color: #31363d;
      .el-sub-menu__title:hover {
        background-color: #31363d;
      }
      .el-menu {
        background-color: #31363d;
      }
      @at-root {
        &.is-active {
          .el-sub-menu__title {
            position: relative;
            &::before {
              @include left-box();
            }
          }
        }
      }
    }
  }
  :deep(.is-active) {
    @at-root {
      &.el-sub-menu {
        .el-sub-menu__title {
          position: relative;
          &::before {
            @include left-box();
          }
          &:hover {
            background-color: #31363d;
          }
        }
      }
    }
    @at-root {
      &.menu-item-1 {
        position: relative;
        background-color: #31363d;
        &::before {
          @include left-box();
        }
      }
    }
  }
}
</style>
