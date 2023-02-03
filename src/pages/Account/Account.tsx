import { Box } from "@mui/material";
import React from "react";

import { Account } from "@/features/account";

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
