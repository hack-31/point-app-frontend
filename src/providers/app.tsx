import { AuthProvider } from "@/lib/auth";
import { queryClient } from "@/lib/react-query";
import { getAppRoutes } from "@/routes";
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import {
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

type AppProviderProps = {
  children?: React.ReactNode;
};

/**
 * プロパイダー
 */
export const AppProvider = ({ children }: AppProviderProps) => {
  const theme = createTheme({});
  return (
    <RecoilRoot>
      <React.Suspense
        fallback={
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
          >
            <CircularProgress />
          </Box>
        }
      >
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider theme={theme}>
              <RouterProvider router={getAppRoutes()} />
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </React.Suspense>
    </RecoilRoot>
  );
};
