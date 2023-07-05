import { Box } from "@mui/material";
import { memo } from "react";

import { Notifications } from "@/features/notification/";

/**
 * path: /notifications
 */
export const NotificationsPage = memo(() => {
  return (
    <Box mx="10px" mt="100px">
      <Notifications />
    </Box>
  );
});
