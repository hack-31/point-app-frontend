import { axios, SuccessResponse } from "@/lib/axios";

export type UpdatePasswordDTO = {
  oldPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = SuccessResponse<null>;

export const updatePassword = (data: UpdatePasswordDTO) => {
  return axios.patch<UpdatePasswordResponse>("/password", data);
};
