import { Box } from "@mui/material";

import { Notification } from "@/features/notification";

/**
 * path: /notifications/:id
 */
export const NotificationPage = () => {
  return (
    <Box mx="10px" mt="100px">
      <Notification />
    </Box>
  );
};
