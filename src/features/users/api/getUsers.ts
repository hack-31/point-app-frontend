import { axios, SuccessResponse } from "@/lib/axios";

export type GetUsersResponse = SuccessResponse<{
  users: {
    acquisitionPoint: number;
    email: string;
    familyName: string;
    familyNameKana: string;
    firstName: string;
    firstNameKana: string;
    id: number;
  }[];
}>;

export const getUsers = () => {
  return axios.get<GetUsersResponse>("/users");
};

// react-queryで使うキー
// apiのURLと合わせること
export const queryKey = ["users"];
