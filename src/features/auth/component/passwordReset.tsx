import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  ERR_MAIL_FORMAT_MESSAGE,
  ERR_REQUIRE_MESSAGE,
  MAIL_FORMAT_REGEXP,
  MAX_MAIL_LENGTH,
} from "@/const/const";
import { ErrResponse } from "@/lib/axios";

import { resetPassword, ResetPasswordDTO } from "../api/resetPassword";

/**
 * パスワードリセット機能
 */
export const PasswordReset: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    (data: ResetPasswordDTO) => resetPassword(data),
    {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err: ErrResponse) => {
        if (err.response?.status === 404) {
          setError(
            "email",
            { message: err.response.data.message },
            { shouldFocus: true }
          );
          return;
        }
      },
    }
  );

  return (
    <Box className="App" mx="auto" maxWidth="400px" mt="100px">
      <Box textAlign="center" component="h2" mb="60px" color="#333">
        パスワードリセット
      </Box>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <Box marginBottom="24px">
          <Box mb="4px">メールアドレス</Box>
          <TextField
            fullWidth
            placeholder="yamada.taro@example.com"
            variant="outlined"
            type="email"
            {...register("email", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
              pattern: {
                value: MAIL_FORMAT_REGEXP,
                message: ERR_MAIL_FORMAT_MESSAGE,
              },
              maxLength: {
                value: MAX_MAIL_LENGTH.VALUE,
                message: MAX_MAIL_LENGTH.MESSAGE,
              },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.email?.message}</Box>
        </Box>
        <LoadingButton
          size="large"
          fullWidth
          sx={{ marginTop: "50px" }}
          variant="contained"
          type="submit"
          color="primary"
          loading={isLoading}
        >
          リセットメール送信
        </LoadingButton>
      </form>
    </Box>
  );
});
