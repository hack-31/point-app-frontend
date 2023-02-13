import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

import {
  ERR_REQUIRE_MESSAGE,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/const/const";
import { ErrResponse } from "@/lib/axios";

import { updatePassword, UpdatePasswordDTO } from "../api/updatePassword";
import { SideBarLayout } from "./sideBarLayout";

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
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
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
            {...register("oldPassword", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              minLength: {
                value: MIN_PASSWORD_LENGTH.VALUE,
                message: MIN_PASSWORD_LENGTH.MESSAGE,
              },
              maxLength: {
                value: MAX_PASSWORD_LENGTH.VALUE,
                message: MAX_PASSWORD_LENGTH.MESSAGE,
              },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.oldPassword?.message}</Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">新しいパスワード</Box>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            {...register("newPassword", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              minLength: {
                value: MIN_PASSWORD_LENGTH.VALUE,
                message: MIN_PASSWORD_LENGTH.MESSAGE,
              },
              maxLength: {
                value: MAX_PASSWORD_LENGTH.VALUE,
                message: MAX_PASSWORD_LENGTH.MESSAGE,
              },
            })}
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
