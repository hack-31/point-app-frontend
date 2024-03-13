import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { API_URL } from "@/config";
import * as snackbar from "@/lib/toast";
import storage from "@/utils/storage";

/**
 * 各リクエストごとにヘッダーを設定するためのインターセプター関数
 * 各リクエスト毎にこの関数が走る
 *
 * @param config リクエストヘッダー一覧
 * @returns 修正したリクエストヘッダー
 */
function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken() as string;
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  config.headers.set("Accept", "application/json");
  return config;
}
/**
 * ラッピングされたaxios関数
 *
 * こちらをHTTPクライアントはこちらを利用する
 */
export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response: AxiosResponse<SuccessResponse<unknown>>) => {
    if (response.data.statusCode === 201) {
      snackbar.success(response.data.message);
    }
    return response;
  },
  (error: ErrResponse) => {
    // エラーのatoms持たせて、ここで突っ込めば共通化できる
    snackbar.error(error.response?.data.message);
    return Promise.reject(error);
  }
);

/** 成功レスポンス(axiosの型は含まない) */
export type SuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};
/** 失敗レスポンス(axiosの型を含む) */
export type ErrResponse = AxiosError<{
  statusCode: number;
  title: string;
  message: string;
}>;
