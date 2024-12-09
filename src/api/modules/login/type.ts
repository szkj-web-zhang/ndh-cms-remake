// 登录
export namespace Login {
  // 二维码响应数据
  export interface QrcodeResponse {
    code: string;
    time: number;
  }
  // 发送短信验证码入参
  export interface SmsCodeParams {
    account: string; //手机号
    state: 1 | 2 | 3; //1-注册2-登录3-不做判断
  }
  // 手机号登录入参
  export interface PhoneLoginParams {
    account: string;
    varificationCode: string;
  }
}

// 用户信息
export namespace User {
  export interface Info {
    id: number; //用户id
    phoneNumber: string; //手机号
    cmsUuid: string; //uuid
    password: string;
    headPortrait: string; //头像
    nickName: string; //昵称
    blacklist: number; //1-正常 2-黑名单 3-注销
    parentUuid: string; //上级uuid
    didSymbol: string; //did标识
    roles: number;
    depts: number;
  }
  export interface Response {
    account: Info;
    token: string;
  }
}
