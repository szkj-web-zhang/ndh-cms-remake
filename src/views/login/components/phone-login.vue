<template>
  <div class="flex fd-c al-fs">
    <span class="phone-tab flex-inline al-c jc-c">手机号登录</span>
    <el-form ref="formRef" :model="params" :rules="rules">
      <el-form-item prop="account" class="phone-form">
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
  </div>
</template>

<script lang="ts" setup>
import { Login } from "@/api/modules/login/type";
import { useCountDown } from "@/hooks/use-count-down";
import { phoneNumberVerify } from "@/utils/verify-rules";
import { FormRules } from "element-plus";
import { computed, reactive, ref, unref, useTemplateRef } from "vue";

// ref
const formRef = useTemplateRef("formRef");
// 加载状态
const loading = ref(false);
// 验证码验证状态
const codeCheck = ref(true);
// 表单数据
const params = reactive<Login.PhoneLoginParams>({
  account: "",
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
  if (!codeCheck.value) {
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
 * 发送验证码
 */
const handleCodeSend = async () => {
  loading.value = true;
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
</style>
