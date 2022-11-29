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
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
