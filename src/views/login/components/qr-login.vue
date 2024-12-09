<template>
  <div class="qr-container flex fd-c al-c">
    <div class="qr-box" v-loading="loading">
      <vue-qr
        v-if="qrcode"
        :size="180"
        :margin="0"
        :logo-src="qrLogo"
        :logo-scale="0.2"
        :text="qrcode.code"
      />
      <div v-if="isExpired" class="qrcode-mask flex fd-c al-c jc-c">
        <span>二维码已失效</span>
        <span>请点击下方按钮刷新</span>
      </div>
    </div>
    <p class="qr-tip">
      请使用
      <span>实名DID</span>
      扫码登录
    </p>
    <div class="refresh-btn flex-inline al-c jc-c" @click="handleRefreshQrcode">
      刷新二维码
    </div>
  </div>
</template>

<script lang="ts" setup>
import { qrcode_get } from "@/api/modules/login";
import { Login, User } from "@/api/modules/login/type";
import qrLogo from "@/assets/images/qr_logo.png";
import { useUserStore } from "@/stores/modules/user";
import { useDebounceFn } from "@vueuse/core";
import { ElMessage } from "element-plus";
import { nextTick, onBeforeMount, onBeforeUnmount, ref } from "vue";
import vueQr from "vue-qr/src/packages/vue-qr.vue";
import { useRouter } from "vue-router";
interface WsDataType extends User.Response {
  result: number; // 0:取消 | 1：登录成功 | 2:扫码成功 | 3:码失效 | 4:账号不存在
}

// pinia
const userStore = useUserStore();
// route
const router = useRouter();
// 加载
const loading = ref(false);
// 二维码数据
const qrcode = ref<Login.QrcodeResponse>();
// 二维码状态
const isExpired = ref(false);
// ws
const webSocket = ref<WebSocket>();

onBeforeMount(() => {
  handleGetQrcode();
});

onBeforeUnmount(() => {
  webSocket.value?.close();
});

/**
 * 获取二维码
 */
const handleGetQrcode = async () => {
  loading.value = true;
  try {
    const res = await qrcode_get();
    if (res.code === 200) {
      const perfix = import.meta.env.VITE_API_URL;
      qrcode.value = {
        code: `${perfix}/did/auth_login?code=${res.data.code}`,
        time: res.data.time
      };
      nextTick(() => {
        initSocket(res.data.code);
      });
    }
  } catch (error) {
    ElMessage.error("获取二维码失败");
  } finally {
    loading.value = false;
  }
};

/**
 * 刷新二维码
 */
const handleRefreshQrcode = useDebounceFn(() => {
  qrcode.value = undefined;
  webSocket.value?.close();
  isExpired.value = false;
  handleGetQrcode();
}, 200);

/**
 * 建立ws连接
 */
const initSocket = (code?: string) => {
  if (typeof WebSocket === "undefined") {
    ElMessage.error("您的浏览器不支持WebSocket，请使用现代浏览器");
  } else {
    const perfix = import.meta.env.VITE_API_URL;
    const ws = new WebSocket(`${perfix}/ndh-freshCms/codeWs/${code}`);
    webSocket.value = ws;
    ws.onopen = () => {
      // 60s后过期
      setTimeout(() => {
        isExpired.value = true;
      }, 60000);
    };
    ws.onmessage = e => {
      const data: WsDataType = JSON.parse(e.data);
      switch (data.result) {
        case 1:
          handleAfterLogin(data);
          break;
        case 2:
          console.log("扫码成功");
          break;
        case 3:
          console.log("二维码失效");
          break;
        case 4:
          console.log("账号不存在");
          break;
        default:
          break;
      }
    };
    ws.onclose = () => {
      console.log("WebSocket连接已关闭");
    };
    ws.onerror = error => {
      console.log("WebSocket连接错误:", error);
    };
  }
};

/**
 * 登录成功后跳转
 */
const handleAfterLogin = (data: WsDataType) => {
  ElMessage.success("登录成功");
  userStore.setToken(data.token);
  userStore.setUserInfo(data.account);
  webSocket.value?.close();
  router.push("/layout");
};
</script>

<style lang="scss" scoped>
.qr-container {
  width: 100%;
  padding-block-start: 30px;
  .qr-box {
    width: 180px;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    .qrcode-mask {
      width: 180px;
      height: 180px;
      font-family: R;
      font-size: 12px;
      color: var(--text-color-v0);
      line-height: 20px;
      position: absolute;
      top: 0;
      left: 0;
      background: rgba(8, 9, 10, 0.72);
    }
  }
  .qr-tip {
    font-size: 14px;
    font-family: PM;
    color: var(--text-color-v2);
    line-height: 22px;
    margin-block-start: 8px;
    margin-block-end: 24px;
    span {
      color: var(--color-primary);
    }
  }
  .refresh-btn {
    height: 40px;
    font-size: 16px;
    font-family: PM;
    color: var(--color-primary);
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    border: 1px solid var(--color-primary);
    padding-block: 8px;
    padding-inline: 8px;
  }
}
</style>
