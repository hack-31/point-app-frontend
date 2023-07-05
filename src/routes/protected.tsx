import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { Suspense } from "react";
import { Outlet, RouteObject } from "react-router-dom";

import { Error } from "@/components/Error";
import { MainLayout } from "@/components/Layout";
import { useAuth } from "@/lib/auth";
import { AccountPage } from "@/pages/Account";
import { AccountUpdatePage } from "@/pages/AccountUpdate";
import { NotificationPage } from "@/pages/Notification";
import { NotificationsPage } from "@/pages/Notifications";
import { PasswordUpdatePage } from "@/pages/PasswordUpdate";
import { UsersPage } from "@/pages/Users";

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
 * ログインしないと見れないページ
 */
export const getProtectedRoutes = (): RouteObject[] => {
  const { user } = useAuth();
  return [
    {
      path: "/",
      element: <App />,
      children: [
        {
          errorElement: <Error />,
          loader: async () => {
            if (!user) {
              throw window.Error("401", {
                cause: "アクセストークンが無効です。再ログインしてください。",
              });
            }
            return null;
          },
          children: [
            { path: "users", element: <UsersPage /> },
            { path: "account", element: <AccountPage /> },
            { path: "profile", element: <AccountUpdatePage /> },
            { path: "password-update", element: <PasswordUpdatePage /> },
            { path: "notifications", element: <NotificationsPage /> },
            {
              path: "notifications/:notificationId",
              element: <NotificationPage />,
            },
          ],
        },
      ],
    },
  ];
};
