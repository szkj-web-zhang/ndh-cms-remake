<template>
  <div class="flex fd-c al-fs">
    <span class="phone-tab flex-inline al-c jc-c">手机号登录</span>
    <el-form ref="formRef" :model="params" :rules="rules">
      <el-form-item prop="account" class="phone-form" :validate-on-rule-change="false">
        <el-input
          class="phone-input"
          maxlength="11"
          placeholder="请输入手机号"
          v-model="params.account"
        />
      </el-form-item>
      <el-form-item prop="varificationCode" class="code-box">
        <el-input
          class="code-input"
          placeholder="请输入验证码"
          maxlength="6"
          v-model="params.varificationCode"
          @blur="handleResetCodeError"
        />
        <el-button
          class="code-button"
          :class="unref(isStart ? 'is-start' : 'default')"
          :disabled="isStart"
          :loading="loading"
          @click="handlePhoneCheck"
        >
          {{ buttonText }}
        </el-button>
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      class="login-button"
      :loading="loginLoading"
      @click="handleLoginCheck"
    >
      登录
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { login_by_phone, login_sms_code_send } from "@/api/modules/login";
import { Login } from "@/api/modules/login/type";
import { useCountDown } from "@/hooks/use-count-down";
import { useUserStore } from "@/stores/modules/user";
import { phoneNumberVerify } from "@/utils/verify-rules";
import { ElMessage, FormRules } from "element-plus";
import { computed, reactive, ref, unref, useTemplateRef } from "vue";
import { initDynamicRoute } from "@/router/modules/dynamic-route";
import { useRouter } from "vue-router";
import { useMenuStore } from "@/stores/modules/menu";
import { useGlobalStore } from "@/stores/modules/global";

// router
const router = useRouter();
// pinia
const userStore = useUserStore();
const globalStore = useGlobalStore();
// ref
const formRef = useTemplateRef("formRef");
// 加载状态
const loading = ref(false);
const loginLoading = ref(false);
// 验证码是否为空
const codeEmpty = ref(false);
// 验证码错误状态
const codeError = ref(false);
// 表单数据
const params = reactive<Login.PhoneLoginParams>({
  account: "13387578795",
  varificationCode: ""
});
// 倒计时hook
const { isStart, currentCount, handleStartTimer } = useCountDown(60);
// 获取倒计时按钮文本
const buttonText = computed(() =>
  !unref(isStart) ? "获取验证码" : `重新获取(${unref(currentCount)}s)`
);

/**
 * 手机号、验证码校验
 */
const phoneFormCheck = (_rule: any, value: string, fn: any) => {
  if (!value.trim()) {
    return fn(new Error("手机号不能为空"));
  }
  if (!phoneNumberVerify(value.trim())) {
    return fn(new Error("手机号格式错误，请重试"));
  }
  return fn();
};
const codeFormCheck = (_rule: any, value: string, fn: any) => {
  if (codeEmpty.value) {
    return fn(new Error("验证码不能为空"));
  }
  if (codeError.value) {
    return fn(new Error("验证码错误"));
  }
  return fn();
};
// 校验规则
const rules = reactive<FormRules<typeof params>>({
  account: [{ validator: phoneFormCheck, trigger: "blur" }],
  varificationCode: [{ validator: codeFormCheck, trigger: "blur" }]
});

/**
 * 手机号验证
 */
const handlePhoneCheck = () => {
  formRef.value?.validateField("account", res => {
    res && handleCodeSend();
  });
};

/**
 * 清除验证码错误状态
 */
const handleResetCodeError = () => {
  if (codeError.value) {
    codeError.value = false;
    formRef.value?.validate();
  }
};

/**
 * 发送验证码
 */
const handleCodeSend = async () => {
  loading.value = true;
  try {
    const { code } = await login_sms_code_send({
      account: params.account,
      state: 2
    });
    if (code === 200) {
      handleStartTimer();
      ElMessage.success("验证码发送成功");
    }
  } finally {
    loading.value = false;
  }
};

/**
 * 登录验证
 */
const handleLoginCheck = () => {
  codeEmpty.value = !params.varificationCode.length;
  formRef.value?.validateField(["account", "varificationCode"], res => {
    res && handleLogin();
  });
};

/**
 * 登录
 */
const handleLogin = async () => {
  const { account, varificationCode } = params;
  loginLoading.value = true;
  try {
    const res = await login_by_phone({ account, varificationCode });
    if (res.code === 200) {
      userStore.setUserInfo(res.data.account);
      userStore.setToken(res.data.token);
      await globalStore.getNavigation();
      await initDynamicRoute();
      router.push("/");
    }
  } catch (err: any) {
    if (err.code === 500) {
      codeError.value = true;
      formRef.value?.validate();
    }
  } finally {
    loginLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@mixin input {
  height: 56px;
  :deep(.el-input__wrapper) {
    border-radius: 12px;
    padding-inline: 16px;
  }
}

.phone-tab {
  height: 40px;
  font-size: 18px;
  color: var(--color-primary);
  font-family: PM;
  line-height: 26px;
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-inline: 57px;
  margin-block-end: 20px;
  &:after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: var(--color-primary);
  }
}

.el-form {
  width: 100%;
  .el-form-item {
    margin-bottom: 20px;
    :deep(.el-form-item__content .el-form-item__error) {
      font-family: PR;
    }
  }
}

.phone-input {
  @include input();
}

.code-box {
  height: 56px;
  margin-bottom: 56px !important;
  :deep(.el-form-item__content) {
    justify-content: space-between;
  }
  .code-input {
    width: 268px;
    @include input();
  }
}

.code-button {
  width: 120px;
  height: 100%;
  font-family: PR;
  border-radius: 12px;
  border: none;
  &.is-start {
    background-color: var(--bg-color-v3);
    color: var(--text-color-v4);
  }
  &.default {
    background-color: var(--color-primary);
    color: var(--text-color-v0);
  }
}

.login-button {
  width: 100%;
  height: 56px;
  font-family: PR;
  font-size: 18px;
  color: var(--text-color-v0);
  border-radius: 12px;
}
</style>
