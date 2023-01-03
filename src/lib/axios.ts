import { API_URL } from "@/config";
import storage from "@/utils/storage";
import Axios, { AxiosRequestConfig } from "axios";

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken() as string;

  if (token) {
    config.headers
      ? (config.headers.Authorization = `Bearer ${token}`)
      : (config.headers = { Authorization: `Bearer ${token}` });
  }

  config.headers
    ? (config.headers.Accept = "application/json")
    : (config.headers = { Accept: "application/json" });

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
