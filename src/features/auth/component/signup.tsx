import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  ERR_MAIL_FORMAT_MESSAGE,
  ERR_REQUIRE_MESSAGE,
  MAX_MAIL_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/const/const";
import { useHandleDialog } from "@/hooks";
import { ErrResponse } from "@/lib/axios";

import {
  registerTemporaryWithEmailAndPassword,
  TemporaryRegisterCredentialsDTO,
} from "../api/temporaryRegister";
import { AuthCodeModal } from "./authCodeModal";

const schema = z
  .object({
    email: z
      .string()
      .min(1, ERR_REQUIRE_MESSAGE)
      .max(MAX_MAIL_LENGTH.VALUE, MAX_MAIL_LENGTH.MESSAGE)
      .email(ERR_MAIL_FORMAT_MESSAGE),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH.VALUE, MIN_PASSWORD_LENGTH.MESSAGE)
      .max(MAX_PASSWORD_LENGTH.VALUE, MAX_PASSWORD_LENGTH.MESSAGE),
    familyName: z
      .string()
      .min(1, ERR_REQUIRE_MESSAGE)
      .max(MAX_USERNAME_LENGTH.VALUE, MAX_USERNAME_LENGTH.MESSAGE),
    familyNameKana: z
      .string()
      .min(1, ERR_REQUIRE_MESSAGE)
      .max(MAX_USERNAME_LENGTH.VALUE, MAX_USERNAME_LENGTH.MESSAGE),
    firstName: z
      .string()
      .min(1, ERR_REQUIRE_MESSAGE)
      .max(MAX_USERNAME_LENGTH.VALUE, MAX_USERNAME_LENGTH.MESSAGE),
    firstNameKana: z
      .string()
      .min(1, ERR_REQUIRE_MESSAGE)
      .max(MAX_USERNAME_LENGTH.VALUE, MAX_USERNAME_LENGTH.MESSAGE),
  })
  .required();
type Schema = z.infer<typeof schema>;

/**
 * サインアップ機能
 */
export const Signup: React.FC = React.memo(() => {
  const [temporaryUserId, setTemporaryUserId] = React.useState<string>("");
  const { handleClose, handleOpen, isOpenDialog } = useHandleDialog();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useMutation(
    (data: TemporaryRegisterCredentialsDTO) =>
      registerTemporaryWithEmailAndPassword(data),
    {
      onSuccess: (res) => {
        setTemporaryUserId(res.data.data.temporaryUserId);
        handleOpen();
      },
      onError: (err: ErrResponse) => {
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
            {...register("email")}
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
            {...register("familyName")}
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
            {...register("firstName")}
          />
          <Box sx={{ color: "error.main" }}>{errors.firstName?.message}</Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">姓カナ（全角）</Box>
          <TextField
            fullWidth
            placeholder="ヤマダ"
            type="text"
            variant="outlined"
            {...register("familyNameKana")}
          />
          <Box sx={{ color: "error.main" }}>
            {errors.familyNameKana?.message}
          </Box>
        </Box>
        <Box marginBottom="24px">
          <Box mb="4px">名カナ（全角）</Box>
          <TextField
            fullWidth
            type="text"
            placeholder="タロウ"
            variant="outlined"
            {...register("firstNameKana")}
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
            {...register("password")}
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
        open={isOpenDialog}
        email={getValues("email")}
        closeModal={handleClose}
        temporaryUserId={temporaryUserId}
      />
    </Box>
  );
});
