import { axios } from "@/lib/axios";

export type TemporarySignUpRequest = {
  familyName: string;
  familyNameKana: string;
  firstName: string;
  firstNameKana: string;
  email: string;
  password: string;
};

export type TemporarySignupResponse = {
  temporaryUserId: string;
};

export const temporarySignup = (
  data: TemporarySignUpRequest
): Promise<TemporarySignupResponse> => {
  return axios.post("/temporary_users", data);
};

export type SignUpRequest = {
  temporaryUserId: string;
  confirmCode: string;
};

export type SignupResponse = {
  userId: number;
  accessToken: string;
};

export const signup = (data: SignUpRequest): Promise<SignupResponse> => {
  return axios.post("/users", data);
};
