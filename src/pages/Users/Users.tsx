import { Box } from "@mui/material";
import React from "react";

import { PointTransactionModal } from "@/features/pointTransaction";
import { Users } from "@/features/users";
import { useHandleDialog } from "@/hooks";

/**
 * path: /users
 */
export const UsersPage = () => {
  const { handleClose, handleOpen, isOpenDialog } = useHandleDialog();
  const [toUser, setToUser] = React.useState({ name: "", id: 0 });

  return (
    <Box mx="10px" mt="100px">
      <Users
        onClick={({ id, firstName, familyName }) => {
          handleOpen();
          setToUser({ name: `${familyName} ${firstName}`, id });
        }}
      />
      <PointTransactionModal
        open={isOpenDialog}
        toUserId={toUser.id}
        toUserName={toUser.name}
        closeModal={handleClose}
      />
    </Box>
  );
};
