import { axios, SuccessResponse } from "@/lib/axios";

export type GetNotificationResponse = SuccessResponse<{
  notifications: {
    id: number;
    title: string;
    description: string;
    isChecked: boolean;
  }[];
  nextToken: number;
}>;

/**
 * 条件い応じたお知らせ一覧を取得する
 * @param param0.size コンテンツ取得数
 * @param param0.nextToken 次表示のためのトークン
 * @returns 結果
 */
export const getNotifications = ({
  size,
  nextToken,
}: {
  size: number;
  nextToken: number;
}) => {
  return axios.get<GetNotificationResponse>("/notifications", {
    params: {
      size,
      nextToken,
    },
  });
};

export const queryKey = ["notifications"];
