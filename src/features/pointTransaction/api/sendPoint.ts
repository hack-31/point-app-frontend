import { axios, SuccessResponse } from "@/lib/axios";

export type SendPointDTO = {
  toUserId: number;
  sendPoint: number;
};

export type SendPointResponse = SuccessResponse<null>;

export const sendPoint = (data: SendPointDTO) => {
  return axios.post<SendPointResponse>("/point_transactions", data);
};
