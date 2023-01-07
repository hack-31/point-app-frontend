import {
  ERR_MAIL_FORMAT_MESSAGE,
  ERR_REQUIRE_MESSAGE,
  MAIL_FORMAT_REGEXP,
  MAX_MAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/const/const";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import {
  registerTemporaryWithEmailAndPassword,
  TemporaryRegisterCredentialsDTO,
} from "../api/temporaryRegister";
import { useHandleConfirmDialog } from "../hooks/handleDialog";
import { AuthCodeModal } from "./authCodeModal";

/**
 * サインアップ機能
 */
export const Signup: React.FC = React.memo(() => {
  const [temporaryUserId, setTemporaryUserId] = React.useState<string>("");
  const { handleClose, handleOpen, openDialog } = useHandleConfirmDialog();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      familyName: "",
      familyNameKana: "",
      firstName: "",
      firstNameKana: "",
      password: "",
    },
  });

  const { mutate, isLoading } = useMutation(
    (data: TemporaryRegisterCredentialsDTO) =>
      registerTemporaryWithEmailAndPassword(data),
    {
      onSuccess: (res) => {
        setTemporaryUserId(res.data.data.temporaryUserId);
        handleOpen();
      },
      onError: (
        err: AxiosError<{ statusCode: number; title: string; message: string }>
      ) => {
        if (err.response?.status === 409) {
          setError(
            "email",
            { message: err.response.data.message },
            { shouldFocus: true }
          );
          return;
        }
        throw Error(err.response?.data.message);
      },
    }
  );

  return (
    <Box className="App" mx="auto" maxWidth="400px" mt="100px">
      <Box textAlign="center" component="h2" mb="60px" color="#333">
        アカウント新規登録
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
        <Box marginBottom="24px">
          <Box mb="4px">姓（全角）</Box>
          <TextField
            fullWidth
            placeholder="山田"
            type="text"
            variant="outlined"
            {...register("familyName", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.familyName?.message}</Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">名（全角）</Box>
          <TextField
            fullWidth
            placeholder="太郎"
            type="text"
            variant="outlined"
            {...register("firstName", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
            })}
          />
          <Box sx={{ color: "error.main" }}>
            {errors.familyNameKana?.message}
          </Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">姓カナ（全角）</Box>
          <TextField
            fullWidth
            placeholder="ヤマダ"
            type="text"
            variant="outlined"
            {...register("familyNameKana", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
            })}
          />
          <Box sx={{ color: "error.main" }}>{errors.firstName?.message}</Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">名カナ（全角）</Box>
          <TextField
            fullWidth
            type="text"
            placeholder="タロウ"
            variant="outlined"
            {...register("firstNameKana", {
              required: { value: true, message: ERR_REQUIRE_MESSAGE },
            })}
          />
          <Box sx={{ color: "error.main" }}>
            {errors.firstNameKana?.message}
          </Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">パスワード</Box>
          <TextField
            fullWidth
            type="password"
            variant="outlined"
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
          loading={isLoading}
        >
          登録
        </LoadingButton>
      </form>

      <AuthCodeModal
        open={openDialog}
        email={getValues("email")}
        closeModal={handleClose}
        temporaryUserId={temporaryUserId}
      />
    </Box>
  );
});
