import { RegisterCredentialsDTO, registerUser } from "@/features/auth";
import { getUser } from "@/features/auth/api/getUser";
import {
  LoginCredentialsDTO,
  loginWithEmailAndPassword,
} from "@/features/auth/api/login";
import { ErrResponse } from "@/lib/axios";
import { initReactQueryAuth } from "@/lib/react-query-auth";
import storage from "@/utils/storage";
import { Box, LinearProgress } from "@mui/material";
import { AxiosError } from "axios";

async function loadUser() {
  if (!storage.getToken()) return null;
  try {
    const res = await getUser();
    return res.data.data;
  } catch (error) {
    return null;
  }
}

async function loginFn(data: LoginCredentialsDTO) {
  // lib/react-query-auth.tsxでuseErrorBoundaryをfalseに指定しており、
  // 例外をキャッチしない設定なのでtry/catchはしない
  const response = await loginWithEmailAndPassword(data);
  storage.setToken(response.data.data.accessToken);
  const res = await getUser();
  return res.data.data;
}

async function registerFn(data: RegisterCredentialsDTO) {
  // lib/react-query-auth.tsxでuseErrorBoundaryをfalseに指定しており、
  // 例外をキャッチしない設定なのでtry/catchはしない
  const response = await registerUser(data);
  storage.setToken(response.data.data.accessToken);
  const res = await getUser();
  return res.data.data;
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

type AuthUser = {
  acquisitionPoint: number;
  email: string;
  firstName: string;
  firstNameKana: string;
  familyName: string;
  familyNameKana: string;
  sendablePoint: number;
  userId: number;
};

export const { AuthProvider, useAuth, AuthConsumer } = initReactQueryAuth<
  AuthUser | null,
  ErrResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
