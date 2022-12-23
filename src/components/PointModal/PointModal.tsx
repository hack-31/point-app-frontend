import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type PointModalProps = {
  show: boolean;
  setShow: () => {};
  handleAuth: () => {};
  point: number;
};

// export const PointModal = (props: PointModalProps) => {
//   return (
//     <Dialog open={props.open} onClose={handleClose}>
//       <DialogTitle>認証コード</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           xxxxx@gmail.comに送信された認証コードを入力してください。
//         </DialogContentText>
//         <TextField
//           autoFocus
//           margin="dense"
//           id="authCode"
//           label="4桁の認証コード"
//           fullWidth
//           type="text"
//           variant="standard"
//           inputProps={{ maxLength: 4, pattern: "^[0-9]+$" }}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={props.handleAuth}>認証</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
