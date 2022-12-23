import { axios } from "@/lib/axios";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return axios.post("/tokens", data);
};
