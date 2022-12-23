import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { lazyImport } from "@/utils/lazyImport";
import { Layout } from "@/components/Layout";

const { Users } = lazyImport(() => import("@/pages/Users"), "Users");
const { Login } = lazyImport(() => import("@/pages/Login"), "Login");
const { Signup } = lazyImport(() => import("@/pages/Signup"), "Signup");

const theme = createTheme({});

export const AppRoutes = () => {
  // TODO: メールアドレス・パスワード変更画面、名前変更画面のルーティング追加
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Users />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/*<Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/account" element={<Account />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};
