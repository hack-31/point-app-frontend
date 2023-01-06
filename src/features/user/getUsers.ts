import { axios } from "@/lib/axios";
import { useRecoilValue } from "recoil";
import { sessionKeyState } from "../../states/auth/atoms";

export type GetUserResponse = {
  users: {
    familytName: string;
    familyNameKana: string;
    firstName: string;
    firstNameKana: string;
    email: string;
    acquisitionPoint: number;
  }[];
};

export const getUsers = (): Promise<GetUserResponse> => {
  const sessionKey = useRecoilValue(sessionKeyState);
  return axios.get("/users", {
    headers: { Authorization: `Bearer ${sessionKey}` },
  });
};
