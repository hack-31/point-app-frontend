import { axios, SuccessResponse } from "@/lib/axios";

export type GetNotificationResponse = SuccessResponse<{
  id: number;
  title: string;
  description: string;
  isChecked: boolean;
  createdAt: string;
}>;

/**
 * お知らせ詳細取得
 * @param id お知らせID
 * @returns 結果
 */
export const getNotification = (id: string) => {
  return axios.get<GetNotificationResponse>(`/notifications/${id}`);
};

export const getNotificationQuery = ["notification"];
