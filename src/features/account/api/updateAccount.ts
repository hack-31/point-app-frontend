import { axios, SuccessResponse } from "@/lib/axios";

export type UpdateAccountDTO = {
  familyName: string;
  familyNameKana: string;
  firstName: string;
  firstNameKana: string;
};

export type UpdateAccountResponse = SuccessResponse<null>;

export const updateAccount = (data: UpdateAccountDTO) => {
  return axios.put<UpdateAccountResponse>("/account", data);
};
