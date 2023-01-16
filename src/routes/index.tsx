import { Error } from "@/components/Error";
import { useAuth } from "@/lib/auth";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { getProtectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import "react-toastify/dist/ReactToastify.css";

/**
 * 全体のルーティングの設定
 */
export const getAppRoutes = () => {
  const { user } = useAuth();
  const commonRoutes: RouteObject[] = [
    {
      path: "/",
      errorElement: (
        <Error
          status="404"
          message="このページはすでに削除されているか、URLが間違っている可能性があります。"
        />
      ),
      loader: async () => {
        if (!user) {
          return redirect("/login");
        }
        return redirect("/users");
      },
    },
  ];

  const root = createBrowserRouter([
    ...commonRoutes,
    ...publicRoutes,
    ...getProtectedRoutes(),
  ]);

  return root;
};
