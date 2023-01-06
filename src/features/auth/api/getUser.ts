import { axios, SuccessResponse } from "@/lib/axios";

export type UserResponse = SuccessResponse<{
  acquisitionPoint: number;
  email: string;
  firstName: string;
  firstNameKana: string;
  familyName: string;
  familyNameKana: string;
  sendablePoint: number;
  userId: number;
}>;

export const getUser = () => {
  return axios.get<UserResponse>("/account");
};
