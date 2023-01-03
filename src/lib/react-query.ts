import { DefaultOptions, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryConfig: DefaultOptions<
  AxiosError<{ statusCode: number; title: string; message: string }>
> = {
  queries: {
    suspense: true,
    useErrorBoundary(error) {
      // 500エラーは例外エラーとしてキャッチさせる
      if (error.response) {
        return error.response?.status >= 500;
      }
      return true;
    },
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    useErrorBoundary(error) {
      // 500エラーは例外エラーとしてキャッチさせる
      if (error.response) {
        return error.response?.status >= 500;
      }
      return true;
    },
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig as DefaultOptions,
});
