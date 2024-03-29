import Box from "@mui/material/Box";
import * as React from "react";

import { Header } from "@/components/Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

/**
 * メインレイアウト
 * @param param0 子コンポーネント
 */
export const MainLayout = React.memo(({ children }: MainLayoutProps) => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box
        sx={[
          {
            flex: 1,
            my: "55px",
            mx: "auto",
            width: "100%",
            maxWidth: "1230px",
          },
          ({ breakpoints }) => ({
            [breakpoints.up("sm")]: {
              my: "64px",
            },
          }),
        ]}
      >
        <main>{children}</main>
      </Box>
      <footer>copy light, point app. inc.</footer>
    </Box>
  );
});
