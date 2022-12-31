import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "@/config";

function authRequestInterceptor(config: AxiosRequestConfig) {
  config.headers?.common?.setAccept("application/json");
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
  (response) => {
    return response;
  },
  (error) => {
    // エラーのatoms持たせて、ここで突っ込めば共通化できる
    return Promise.reject(error);
  }
);

export type SuccessResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type ErrResponse = {
  statusCode: number;
  title: string;
  message: string;
};
