import { MainLayout } from "@/components/Layout";
import { Error } from "@/components/Error";
import { lazyImport } from "@/utils/lazyImport";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const { SignupPage } = lazyImport(() => import("@/pages/Signup"), "SignupPage");

const App = () => {
  return (
    <MainLayout>
      <Suspense
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
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

/**
 * ログインしていない時でもみれるページ一覧
 */
export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [{ path: "/signup", element: <SignupPage /> }],
  },
];
