import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { queryKey } from "@/features/users/api/getUsers";
import { useAuth } from "@/lib/auth";
import { ErrResponse } from "@/lib/axios";

import { sendPoint, SendPointDTO } from "../api/sendPoint";

const schema = z
  .object({
    sendPoint: z.coerce.number().min(1, "１以上の数値を指定してください。"),
  })
  .required();
type Schema = z.infer<typeof schema>;

type AuthCodeModalProps = {
  open: boolean;
  toUserId: number;
  toUserName: string;
  closeModal: () => void;
};

/**
 * ポイント取引ダイアログ
 * @param param0.closeModal モーダルを閉じる
 * @param param0.open モーダル開閉フラグ
 * @param param0.toUserName 送信先名前
 * @param param0.toUserId 送信先ID
 */
export const PointTransactionModal = React.memo(
  ({ toUserName, open, toUserId, closeModal }: AuthCodeModalProps) => {
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors },
      reset,
    } = useForm<Schema>({
      resolver: zodResolver(schema),
    });

    const { user, refetchUser } = useAuth();
    const queryClient = useQueryClient();
    const { mutate, isLoading } = useMutation(
      (data: SendPointDTO) => sendPoint(data),
      {
        onSuccess: () => {
          closeModal();
          refetchUser();
          queryClient.invalidateQueries(queryKey);
        },
        onError: (err: ErrResponse) => {
          setError(
            "sendPoint",
            { message: err.response?.data.message },
            { shouldFocus: true }
          );
        },
      }
    );

    return (
      <Dialog
        open={open}
        fullWidth
        onClose={() => {
          closeModal();
          reset();
        }}
      >
        <form
          onSubmit={handleSubmit(async ({ sendPoint }) => {
            mutate({ sendPoint: sendPoint * 100, toUserId });
          })}
        >
          <DialogContent>
            <Box margin="60px 0">
              <DialogContentText>
                <Box textAlign="center">
                  <Box component="span" fontWeight="800" fontSize="20px">
                    {toUserName}
                  </Box>
                  <Box component="span">さんに</Box>
                </Box>
                <Box textAlign="center">いくらポイント送りますか？</Box>
              </DialogContentText>
              <Box display="grid" sx={{ placeContent: "center" }}>
                <Box
                  display="flex"
                  alignItems="flex-end"
                  justifyContent="center"
                  mt="20px"
                >
                  <TextField
                    autoFocus
                    title="送付ポイント"
                    sx={{
                      "& input": { textAlign: "right" },
                      maxWidth: "300px",
                    }}
                    type="number"
                    variant="outlined"
                    {...register("sendPoint")}
                  />
                  <Box width="70px" ml="10px" fontSize="20px">
                    00 px
                  </Box>
                </Box>
                <Box sx={{ color: "error.main" }}>
                  {errors.sendPoint?.message}
                </Box>
                <Box margin="30px 0">
                  送付可能ポイント：{user?.sendablePoint}pt
                </Box>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Box display="flex" justifyContent="left">
              <Button
                type="button"
                onClick={() => {
                  closeModal();
                  reset();
                }}
              >
                キャンセル
              </Button>
              <LoadingButton type="submit" loading={isLoading}>
                ポイントを送る
              </LoadingButton>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
);
