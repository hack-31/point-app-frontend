import { axios, SuccessResponse } from "@/lib/axios";

export type ResetPasswordResponse = SuccessResponse<null>;

export type ResetPasswordDTO = {
  email: string;
};

export const resetPassword = (data: ResetPasswordDTO) => {
  return axios.patch<ResetPasswordResponse>("/random_password", data);
};
