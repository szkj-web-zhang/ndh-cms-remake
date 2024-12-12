import { Menu, User } from "@/api/modules/login/type";

// 路由
export namespace Router {
  export interface Option {
    path: string;
    name: string;
    component?: string | (() => Promise<unknown>);
    redirect?: string;
    meta: Meta;
    children?: Option[];
  }
  export interface Meta {
    id?: number;
    icon?: string;
    title: string;
    remark?: string;
    isKeepAlive: boolean;
    permis: string[];
    activeMenu?: string;
    isFull?: boolean;
    type?: number; //1-目录 2-菜单 3-按钮
  }
}

export namespace StoreData {
  // 用户store
  export interface UserStore {
    satoken: string;
    userInfo?: User.Info;
  }
  // 动态权限菜单
  export interface MenuStore {
    menue: Menu.Response;
    router: Router.Option[];
  }
  // 全局数据
  export interface GlobalStore {
    navigation: {
      browserIcon: string;
      browserTitle: string;
    };
  }
  // 标签页
  export interface TabOption {
    title: string;
    path: string;
    name: string;
    isKeepAlive: boolean;
  }
  export interface TabsStore {
    tabs: TabOption[];
  }
}
