<template>
  <el-container>
    <el-aside width="200px">
      <cms-aside />
    </el-aside>
    <el-container class="layout">
      <el-header class="cms-header flex al-c jc-sb">
        <cms-header />
      </el-header>
      <cms-main />
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import CmsAside from "@/components/cms-aside/index.vue";
import CmsHeader from "@/components/cms-header/index.vue";
import CmsMain from "@/components/cms-main/index.vue";
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;
}

.layout {
  min-width: 1024px;
}

.cms-header {
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid var(--border-color-v1);
  box-sizing: border-box;
  box-shadow: var(--shadow-small);
  padding: 0;
}
</style>
