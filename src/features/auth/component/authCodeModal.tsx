import { ERR_REQUIRE_MESSAGE } from "@/const/const";
import { useAuth } from "@/lib/auth";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type AuthCodeModalProps = {
  open: boolean;
  email: string;
  temporaryUserId: string;
  closeModal: () => void;
};

/**
 * 確認コード入力ダイアログ
 */
export const AuthCodeModal = React.memo(
  ({ temporaryUserId, open, email, closeModal }: AuthCodeModalProps) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: { confirmCode: "" },
    });
    const auth = useAuth();
    const navigate = useNavigate();

    return (
      <Dialog open={open}>
        <form
          onSubmit={handleSubmit(async ({ confirmCode }) => {
            await auth.register({
              confirmCode,
              temporaryUserId,
            });
            navigate("/list");
          })}
        >
          <DialogTitle>認証コード</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`${email}に送信された認証コードを入力してください。`}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="4桁の認証コード"
              fullWidth
              type="text"
              variant="standard"
              inputProps={{ maxLength: 4 }}
              {...register("confirmCode", {
                required: { value: true, message: ERR_REQUIRE_MESSAGE },
              })}
            />
            <Box sx={{ color: "error.main" }}>
              {errors.confirmCode?.message}
            </Box>
            <Box sx={{ color: "error.main" }}>
              {auth.error?.response?.data.message}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={closeModal}>
              キャンセル
            </Button>
            <LoadingButton type="submit" loading={auth.isRegistering}>
              認証
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);
