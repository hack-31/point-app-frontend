import { DefaultOptions, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import storage from "@/utils/storage";

const queryConfig: DefaultOptions<
  AxiosError<{ statusCode: number; title: string; message: string }>
> = {
  queries: {
    suspense: true,
    useErrorBoundary(error) {
      // 500エラーは例外エラーとしてキャッチさせる
      if (!error.response) return true;
      if (error.response?.data.title === "認証エラー") {
        storage.clearToken();
        return true;
      }
      return error.response?.status >= 500;
    },
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    useErrorBoundary(error) {
      // 500エラーは例外エラーとしてキャッチさせる
      if (!error.response) return true;
      if (error.response?.data.title === "認証エラー") {
        storage.clearToken();
        return true;
      }
      return error.response?.status >= 500;
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig as DefaultOptions,
});
