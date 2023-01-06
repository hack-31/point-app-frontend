import { axios, SuccessResponse } from "@/lib/axios";

export type TemporaryUserResponse = SuccessResponse<{
  temporaryUserId: string;
}>;

export type TemporaryRegisterCredentialsDTO = {
  email: string;
  password: string;
  firstName: string;
  firstNameKana: string;
  familyName: string;
  familyNameKana: string;
};

export const registerTemporaryWithEmailAndPassword = (
  data: TemporaryRegisterCredentialsDTO
) => {
  return axios.post<TemporaryUserResponse>("/temporary_users", data);
};
