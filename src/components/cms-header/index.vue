<template>
  <span class="header-title">{{ navigation?.browserTitle }}</span>
  <div class="right-content flex fd-r al-c">
    <div class="user-info flex al-c">
      <el-avatar :size="36" :icon="UserFilled" :src="userInfo?.headPortrait" />
      <span class="user-name flex-inline al-c">{{ userInfo?.nickName }}</span>
      <el-tag type="primary" :disable-transitions="true">管理员</el-tag>
    </div>
    <div class="logout-box flex al-c" @click="handleLogout">
      <cms-icon name="icon-icon-tuichu1" size="20" />
      <span>退出登录</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from "@/stores/modules/global";
import { useUserStore } from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { UserFilled } from "@element-plus/icons-vue";
import { logout_get } from "@/api/modules/login";
import { useRouter } from "vue-router";

// route
const router = useRouter();
// pinia
const globalStore = useGlobalStore();
const { navigation } = storeToRefs(globalStore);
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

/**
 * 退出登录
 */
const handleLogout = async () => {
  const res = await logout_get();
  if (res.code === 200) {
    router.push("/login");
    userStore.clearUserInfo();
    globalStore.clearNavigation();
  }
};
</script>

<style lang="scss" scoped>
.header-title {
  font-size: 16px;
  font-family: PM;
  color: var(--text-color-v1);
  white-space: nowrap;
  margin-left: 24px;
}

.right-content {
  height: 100%;
  margin-right: 24px;
  .user-info {
    height: 100%;
  }
  .user-name {
    font-family: PM;
    font-size: 14px;
    color: var(--text-color-v1);
    line-height: 22px;
    white-space: nowrap;
    margin-left: 8px;
    margin-right: 2px;
  }
  .el-tag {
    height: 20px;
    font-size: 12px;
    font-family: PR;
    border: none;
    border-radius: 4px;
    padding: 0 6px;
  }
  .logout-box {
    height: 24px;
    user-select: none;
    cursor: pointer;
    position: relative;
    margin-left: 40px;
    &::before {
      content: "";
      width: 1px;
      height: 24px;
      background-color: var(--border-color-v1);
      position: absolute;
      top: 0;
      left: -20px;
    }
    > span {
      font-family: PM;
      font-size: 14px;
      color: var(--text-color-v3);
      line-height: 22px;
      margin-left: 4px;
    }
  }
}
</style>
