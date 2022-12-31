import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

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
    <Box
      role="alert"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
    >
      <h2>エラーが発生しました。</h2>
      <p>{error.message}</p>
      <Button variant="contained" onClick={() => reset()}>
        再取得
      </Button>
    </Box>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

/**
 * プロパイダー
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const theme = createTheme({});
  return (
    <RecoilRoot>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={({ error, resetErrorBoundary }) => (
              <ErrorFallback reset={resetErrorBoundary} error={error} />
            )}
          >
            <React.Suspense fallback={<div>loading...</div>}>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <Router>
                    <ThemeProvider theme={theme}>{children}</ThemeProvider>
                  </Router>
                </AuthProvider>
              </QueryClientProvider>
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </RecoilRoot>
  );
};
