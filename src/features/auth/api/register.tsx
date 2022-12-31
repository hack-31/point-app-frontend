import { axios, SuccessResponse } from "@/lib/axios";

export type UserResponse = SuccessResponse<{
  accessToken: string;
  userId: string;
}>;

export type RegisterCredentialsDTO = {
  temporaryUserId: string;
  confirmCode: string;
};

export const registerUser = (data: RegisterCredentialsDTO) => {
  return axios.post<UserResponse>("/users", data);
};
