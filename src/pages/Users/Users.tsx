import { GetUserResponse, getUsers } from "@/features/user/getUsers";
import { useState } from "react";

import "../../App.css";
import { useQuery } from "@tanstack/react-query";

export type Users = {
  familytName: string;
  familyNameKana: string;
  firstName: string;
  firstNameKana: string;
  email: string;
  acquisitionPoint: number;
};

export const Users = () => {
  // useQueryでgetUserをコール
  const { data } = useQuery(["users"], () => getUsers);

  return (
    <>
      <h2>メンバー一覧</h2>
      {data}
    </>
  );
};
