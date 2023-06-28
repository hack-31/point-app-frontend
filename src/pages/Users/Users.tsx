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
    <Box mx="10px">
      <img
        style={{
          width: "100vw",
          height: "250px",
          marginRight: "calc(50% - 50vw)",
          marginLeft: "calc(50% - 50vw)",
          objectFit: "cover",
        }}
        src="/header.png"
        alt="header"
      />
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
