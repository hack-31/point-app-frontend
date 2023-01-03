import { Error } from "@/components/Error";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { publicRoutes } from "./public";

/**
 * 全体のルーティングの設定
 */
export const getAppRoutes = () => {
  const commonRoutes: RouteObject[] = [
    {
      path: "/",
      errorElement: (
        <Error
          title="404"
          message="このページはすでに削除されているか、URLが間違っている可能性があります。"
        />
      ),
      loader: async () => {
        // TODO: ログイン状況に応じてリダイレクト先を変更する
        // 以下のコードを参考にする
        // const user = await getUser();
        // if (!user) {
        // ログイン状況していない時はログインへ飛ばす
        //   return redirect("/login");
        // }
        // ログイン状況であれば、ユーザ一覧を表示する
        // return redirect("/list");

        // signupにしているがsigninに飛ばす
        return redirect("/signup");
      },
    },
  ];

  const routes = publicRoutes;
  const root = createBrowserRouter([...commonRoutes, ...routes]);
  return root;
};
