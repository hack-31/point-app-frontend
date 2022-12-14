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
    return Promise.reject(error);
  }
);

export type Response<T> = {
  message: string;
  data: T;
  statusCode: number;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};
