import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./public";

/**
 * 全体のルーティングの設定
 */
export const AppRoutes = () => {
  // TODO: メールアドレス・パスワード変更画面、名前変更画面のルーティング追加
  const commonRoutes = [{ path: "/", element: <div /> }];
  const routes = publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);
  return <>{element}</>;
};
