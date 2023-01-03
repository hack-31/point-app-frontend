import {
  RegisterCredentialsDTO,
  registerUser,
  UserResponse,
} from "@/features/auth";
import { LoginCredentialsDTO } from "@/features/auth/api/login";
import { ErrResponse } from "@/lib/axios";
import { initReactQueryAuth } from "@/lib/react-query-auth";
import storage from "@/utils/storage";
import { Box, LinearProgress } from "@mui/material";
import { AxiosError } from "axios";

async function handleUserResponse(data: UserResponse) {
  const {
    data: { accessToken, userId },
  } = data;
  storage.setToken(accessToken);
  return userId;
}

async function loadUser() {
  // TODO: 一旦コメントアウト
  // トークンより取得するユーザ取得APIを叩く
  // if (storage.getToken()) {
  //   const data = await getUser();
  //   return data;
  // }
  return { userId: "2" };
}

async function loginFn(data: LoginCredentialsDTO) {
  // const response = await loginWithEmailAndPassword(data);
  // const user = await handleUserResponse(response);
  // TODO: 一旦固定値
  return { userId: "1" };
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerUser(data);
  const userId = await handleUserResponse(response.data);
  return { userId };
}

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LinearProgress />
      </Box>
    );
  },
};

// TODO: /acccount　のレスポンスの型に変更する
type AuthUser = {
  userId: string;
};

export const { AuthProvider, useAuth, AuthConsumer } = initReactQueryAuth<
  AuthUser | null,
  AxiosError<ErrResponse>,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
