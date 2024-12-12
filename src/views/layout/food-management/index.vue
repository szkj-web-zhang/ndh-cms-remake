<template>
  <div class="food-management">
    <bread-crumb :list="breadList">
      <el-popover
        width="144"
        placement="bottom-start"
        :offset="6"
        :hide-after="0"
        :show-arrow="false"
        popper-class="export-popover flex fd-c"
      >
        <template #reference>
          <el-button type="primary" plain>导出</el-button>
        </template>
        <div>全部导出</div>
        <div>商品汇总导出</div>
      </el-popover>
    </bread-crumb>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 导航栏
const breadList = [{ label: "订单管理" }, { label: "菜品订单" }];
</script>

<style lang="scss" scoped>
.food-management {
  height: 100%;
}
</style>

<style lang="scss">
.export-popover {
  height: 80px;
  border-radius: 8px !important;
  box-shadow: 0px 0px 8px 0px rgba(20, 56, 102, 0.2) !important;
  border: none !important;
  padding: 8px 0 !important;
  > div {
    width: 100%;
    height: 50%;
    font-size: 14px;
    color: var(--text-color-v1);
    font-family: PR;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0 12px;
    &:hover {
      color: var(--color-primary);
      background-color: var(--color-primary-light);
    }
  }
}
</style>
