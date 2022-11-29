import { queryClient } from "@/lib/react-query";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

/**
 * エラー画面
 * @param param0
 * @returns
 */
const ErrorFallback = ({
  reset,
  error,
}: {
  reset: (...args: unknown[]) => void;
  error: Error;
}) => {
  return (
    <div role="alert">
      <h2>エラーが発生しました。</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>再取得</button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * プロパイダー
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary, error }) => (
            <ErrorFallback reset={resetErrorBoundary} error={error} />
          )}
        >
          <React.Suspense fallback={<div>loading...</div>}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
