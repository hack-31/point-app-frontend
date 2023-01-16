import {
  ERR_MAIL_FORMAT_MESSAGE,
  ERR_REQUIRE_MESSAGE,
  MAIL_FORMAT_REGEXP,
  MAX_MAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/const/const";
import { useAuth } from "@/lib/auth";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLink } from "./arrowLink";

/**
 * ログイン機能
 */
export const Login: React.FC = React.memo(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { login, isLoggingIn } = useAuth();

  return (
    <Box className="App" mx="auto" maxWidth="400px" mt="100px">
      <Box textAlign="center" component="h2" mb="60px" color="#333">
        ログイン
      </Box>
      <form
        onSubmit={handleSubmit(async (data) => {
          await login(data);
          navigate("/users");
        })}
      >
        <Box marginBottom="24px">
          <Box mb="4px">メールアドレス</Box>
          <TextField
            fullWidth
            placeholder="yamada.taro@example.com"
            variant="outlined"
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
        <Box marginBottom="24px">
          <Box mb="4px">パスワード</Box>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
            placeholder="********"
            {...register("password", {
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
          <Box sx={{ color: "error.main" }}>{errors.password?.message}</Box>
        </Box>
        <LoadingButton
          size="large"
          fullWidth
          sx={{ marginTop: "50px" }}
          variant="contained"
          type="submit"
          color="primary"
          loading={isLoggingIn}
        >
          ログイン
        </LoadingButton>
        <Box my="80px" />
        <Box textAlign="center" mb="20px">
          <ArrowLink to="/signup" aria-label="アカウント作成はこちら">
            アカウント新規作成はこちら
          </ArrowLink>
        </Box>
        <Box textAlign="center">
          <ArrowLink to="/password-reset" aria-label="アカウント作成はこちら">
            パスワードを忘れた方はこちら
          </ArrowLink>
        </Box>
      </form>
    </Box>
  );
});
