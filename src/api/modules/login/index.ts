import { Login } from "./type";
import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";

// 获取二维码
export const qrcode_get = () => {
  return http.post<Login.QrcodeResponse>(
    PORT1 + `/cmsAccount/getLoginCode`,
    {},
    { loading: false }
  );
};

// 发送短信验证码
export const login_sms_code_send = (params: Login.SmsCodeParams) => {
  return http.post(PORT1 + `/cmsAccount/regCaptcha`, qs.stringify(params), {
    loading: false
  });
};

// 手机号登录
export const login_by_phone = (params: Login.PhoneLoginParams) => {
  return http.post(PORT1 + `/cmsAccount/loginByCode`, qs.stringify(params), {
    loading: false
  });
};
