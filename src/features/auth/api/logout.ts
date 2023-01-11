import { axios, SuccessResponse } from "@/lib/axios";

export type SignoutResponse = SuccessResponse<null>;

export const signout = () => {
  return axios.delete<SignoutResponse>("/signout");
};
