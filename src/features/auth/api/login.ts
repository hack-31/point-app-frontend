import { axios, SuccessResponse } from "@/lib/axios";

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export type LoginCredentialsResponse = SuccessResponse<{
  accessToken: string;
}>;

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO) => {
  return axios.post<LoginCredentialsResponse>("/signin", data);
};
