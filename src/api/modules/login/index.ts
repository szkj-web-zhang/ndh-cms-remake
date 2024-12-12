import { Login, Menu, User } from "./type";
import http from "@/api";
import { PORT1 } from "@/api/config/servicePort";
import { StoreData } from "@/stores/interface";
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
  return http.post<User.Response>(PORT1 + `/cmsAccount/loginByCode`, qs.stringify(params), {
    loading: false,
    warning: false
  });
};

// 获取权限菜单
export const dynamic_menu_get = () => {
  return http.get<Menu.Response>(PORT1 + `/cmsAccount/getUserPermission`, {}, { loading: false });
};

// 获取导航栏配置
export const global_navigation_get = () => {
  return http.post<StoreData.GlobalStore["navigation"]>(
    PORT1 + `/did/config/browserConfig`,
    {},
    { loading: false }
  );
};

// 退出登录
export const logout_get = () => {
  return http.get(PORT1 + `/accountCms/getAdminPhone`);
};
