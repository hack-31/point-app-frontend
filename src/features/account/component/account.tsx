import { useAuth } from "@/lib/auth";
import { Box } from "@mui/material";
import React from "react";
import { Grid2Layout } from "./grid2Layout";

/**
 * アカウント情報
 */
export const Account: React.FC = React.memo(() => {
  const { user } = useAuth();
  return (
    <Box className="App" mx="auto" maxWidth="800px" mt="100px">
      <Box component="h1" color="primary.main">
        アカウント情報
      </Box>
      <Box component="p" color="primary.light">
        アカウント情報の確認・変更ができます
      </Box>
      <Box my="60px" />
      <Grid2Layout
        title="名前"
        value={
          <Box display="flex">
            <Box color="primary.main" mr="15px">
              {user?.familyName}
            </Box>
            <Box color="primary.main">{user?.firstName}</Box>
          </Box>
        }
      />
      <Grid2Layout
        title="フリガナ"
        value={
          <Box display="flex">
            <Box color="primary.main" mr="15px">
              {user?.familyNameKana}
            </Box>
            <Box color="primary.main">{user?.firstNameKana}</Box>
          </Box>
        }
      />
      <Grid2Layout title="メールアドレス" value={user?.email} />
      <Grid2Layout
        title="今月の送付可能ポイント"
        value={`${user?.sendablePoint} pt`}
      />
      <Grid2Layout
        title="累計獲得ポイント"
        value={`${user?.acquisitionPoint} pt`}
      />
    </Box>
  );
});
