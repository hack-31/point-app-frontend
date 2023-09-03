import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/const/const";
import { ErrResponse } from "@/lib/axios";

import { updatePassword, UpdatePasswordDTO } from "../api/updatePassword";
import { SideBarLayout } from "./sideBarLayout";

const schema = z
  .object({
    oldPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH.VALUE, MIN_PASSWORD_LENGTH.MESSAGE)
      .max(MAX_PASSWORD_LENGTH.VALUE, MAX_PASSWORD_LENGTH.MESSAGE),
    newPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH.VALUE, MIN_PASSWORD_LENGTH.MESSAGE)
      .max(MAX_PASSWORD_LENGTH.VALUE, MAX_PASSWORD_LENGTH.MESSAGE),
  })
  .required();
type Schema = z.infer<typeof schema>;

/**
 * パスワード更新画面の実装
 */
export const PasswordUpdate = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation(
    (data: UpdatePasswordDTO) => updatePassword(data),
    {
      onSuccess: () => {
        reset();
      },
      onError: (err: ErrResponse) => {
        setError(
          "oldPassword",
          { message: err.response?.data.message },
          { shouldFocus: true }
        );
      },
    }
  );

  return (
    <SideBarLayout>
      <Box component="h1" color="primary.main">
        パスワード変更
      </Box>
      <Box component="p" color="primary.light">
        8文字以上で設定してください
      </Box>
      <Box my="60px" />
      <form
        onSubmit={handleSubmit(async (data) => {
          mutate(data);
        })}
      >
        <Box marginBottom="24px">
          <Box mb="4px">現在のパスワード</Box>
          <TextField
            fullWidth
            variant="outlined"
            type="password"
            {...register("oldPassword")}
          />
          <Box sx={{ color: "error.main" }}>{errors.oldPassword?.message}</Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">新しいパスワード</Box>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            {...register("newPassword")}
          />
          <Box sx={{ color: "error.main" }}>{errors.newPassword?.message}</Box>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <LoadingButton
            size="large"
            sx={[
              ({ breakpoints }) => ({
                marginTop: "50px",
                width: "100%",
                [breakpoints.up("sm")]: {
                  width: "150px",
                },
              }),
            ]}
            variant="contained"
            type="submit"
            color="primary"
            loading={isLoading}
          >
            変更
          </LoadingButton>
        </Box>
        <Box my="80px" />
      </form>
    </SideBarLayout>
  );
});
