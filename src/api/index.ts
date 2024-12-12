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
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/utils/fullscreen-loading";
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
  // 生成实例
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    this.setupInterceptors();
  }
  // 设置请求和相应拦截器
  private setupInterceptors() {
    this.service.interceptors.request.use(this.handleRequset, this.handleRequestError);
    this.service.interceptors.response.use(this.handleResponse, this.handleResponseError);
  }
  // 处理请求配置
  private handleRequset(config: CustomAxiosRequestConfig) {
    const userStore = useUserStore();
    config.cancel ??= true;
    config.cancel && axiosCanceler.addPending(config);
    config.loading ??= true;
    config.loading && showFullScreenLoading();
    if (config.headers && typeof config.headers.set === "function") {
      config.headers.set("satoken", userStore.satoken ?? "");
    }
    return config;
  }

  private handleRequestError(error: AxiosError) {
    return Promise.reject(error);
  }
  // 处理响应配置
  private handleResponse(response: AxiosResponse & { config: CustomAxiosRequestConfig }) {
    const { data, config } = response;
    axiosCanceler.removePending(config);
    config.loading && tryHideFullScreenLoading();
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      config.warning ??= true;
      config.warning && ElMessage.error(data.msg);
      return Promise.reject(data);
    }
    return data;
  }

  private async handleResponseError(error: AxiosError) {
    const userStore = useUserStore();
    const { response } = error;
    if (response?.status === ResultEnum.OVERDUE) {
      userStore.clearUserInfo();
      window.localStorage.clear();
    }
    tryHideFullScreenLoading();
    if (response) checkStatus(response.status);
    return Promise.reject(error);
  }

  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object | string, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
}

export default new RequestHttp(config);
