import { User } from "@/api/modules/login/type";

export namespace StoreData {
  // 用户store
  export interface UserStore {
    satoken: string;
    userInfo?: User.Info;
  }
}
