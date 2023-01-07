import { Account } from "@/features/account";
import { Box } from "@mui/material";
import React from "react";

/**
 * path: /account
 */
export const AccountPage = React.memo(() => {
  return (
    <Box mx="10px">
      <Account />
    </Box>
  );
});
