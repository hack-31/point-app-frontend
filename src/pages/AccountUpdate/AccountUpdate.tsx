import { Box } from "@mui/material";
import React from "react";

import { AccountUpdate } from "@/features/account";

/**
 * path: /profile
 */
export const AccountUpdatePage = React.memo(() => {
  return (
    <Box mx="10px">
      <AccountUpdate />
    </Box>
  );
});
