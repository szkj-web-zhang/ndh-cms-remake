import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { ElMessage } from "element-plus";
import { ResultData, ResultEnum } from "./interface";
import { AxiosCanceler } from "./helper/cancel";
import { useUserStore } from "@/stores/modules/user";
import {
  showFullScreenLoading,
  tryHideFullScreenLoading
} from "@/utils/fullscreen-loading";
import { checkStatus } from "./helper/check";

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean;
  cancel?: boolean;
  warning?: boolean;
}

const config = {
  // 默认地址
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域允许携带凭证
  withCredentials: true
};

const axiosCanceler = new AxiosCanceler();

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    // 请求拦截器
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        const userStore = useUserStore();
        config.cancel ??= true;
        config.cancel && axiosCanceler.addPending(config);
        config.loading ??= true;
        config.loading && showFullScreenLoading();
        // 初始化请求头
        if (config.headers && typeof config.headers.set === "function") {
          config.headers.set("satoken", userStore.satoken ?? "");
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.service.interceptors.response.use(
      (response: AxiosResponse & { config: CustomAxiosRequestConfig }) => {
        const { data, config } = response;
        const userStore = useUserStore();
        axiosCanceler.removePending(config);
        config.loading && tryHideFullScreenLoading();
        // 错误处理（接口响应码为200，但接口业务码不为200）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          config.warning ??= true;
          config.warning && ElMessage.error(data.msg);
          return Promise.reject(data);
        }
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;
        tryHideFullScreenLoading();
        if (response) checkStatus(response.status);
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
}

export default new RequestHttp(config);
