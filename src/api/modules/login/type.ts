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
    state: number; //1-注册2-登录3-不做判断
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

// 权限菜单
export namespace Menu {
  export interface Item {
    id: number; //角色id
    parentId: number; //父id
    name: string; //名称
    menuType: 1 | 2 | 3; //菜单类型1-目录 2-菜单 3-按钮
    state: 1 | 0; //状态1-启用0-禁用
    orderNumber: number; //排序字段：降序
    perms: string; //权限标识
    remark: string; //备注
    path: string; //路径
    icon: string; //图标
    indexId: string | number | null;
    children: Item[];
  }
  export type Response = Item[];
  // icon枚举
  export enum MenuIconEnum {
    "系统管理" = "icon-settings-3",
    "成员管理" = "icon-team-2",
    "平台配置" = "icon-paint-brush-line",
    "反馈列表" = "icon-question",
    "用户管理" = "icon-user-5-line",
    "财务管理" = "icon-copper-coin-line",
    "社区服务商" = "icon-organization-chart",
    "团队长管理" = "icon-account-pin-circle-line",
    "自提点管理" = "icon-map-pin",
    "菜品管理" = "icon-shopping-basket-line",
    "订单管理" = "icon-order",
    "区域管理" = "icon-earth"
  }
}
