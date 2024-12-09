<template>
  <div class="login-container">
    <div class="login-box flex fd-c al-c">
      <img src="@/assets/images/login_logo.png" />
      <div class="bottom-box">
        <div
          class="switch-button flex-inline al-fe"
          :style="{ backgroundImage: `url(${logo})` }"
          @click="type = type === 1 ? 2 : 1"
        >
          <el-tag class="login-tag" type="primary" disable-transitions>
            {{ type === 1 ? "手机号登录" : "扫码登录" }}
          </el-tag>
        </div>
        <p class="title">登录系统</p>
        <component :is="type === 1 ? QrLogin : PhoneLogin" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import phoneLogo from "@/assets/images/login_phone.png";
import qrLogo from "@/assets/images/login_qr.png";
import QrLogin from "./components/qr-login.vue";
import PhoneLogin from "./components/phone-login.vue";

// 登录方式 1: 扫码 2: 手机验证码
const type = ref(2);
// 登录方式的logo
const logo = computed(() => (type.value === 1 ? phoneLogo : qrLogo));
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  background: url("@/assets/images/login_bg.png") center/100% 100% no-repeat fixed;
  background-size: cover;
  position: relative;
  padding-block-start: 173px;
}

.login-box {
  width: 464px;
  margin-inline: auto;
  > img {
    width: 246px;
    height: 96px;
    object-fit: contain;
    margin-bottom: 32px;
  }
  .bottom-box {
    width: 100%;
    height: 428px;
    background-color: var(--bg-color-v1);
    box-shadow: 0 0 27px 0 rgba(31, 103, 211, 0.09);
    border-radius: 12px;
    position: relative;
    padding-inline: 28px;
    padding-block-start: 24px;
    .switch-button {
      width: auto;
      height: 47px;
      position: absolute;
      top: 8px;
      right: 8px;
      background-position: right;
      background-size: auto 100%;
      background-repeat: no-repeat;
      object-fit: contain;
      cursor: pointer;
      .login-tag {
        height: 28px !important;
        font-family: PM;
        font-size: 11px;
        background-color: var(--color-primary-light) !important;
        border-radius: 4px !important;
        border: none;
        user-select: none;
        margin-right: 50px;
        padding-inline: 9px;
      }
    }
    .title {
      font-family: PM;
      color: var(--text-color-v1);
      font-size: 24px;
      line-height: 32px;
      margin-block-end: 24px;
    }
  }
}
</style>
