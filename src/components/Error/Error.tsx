import { Box, Button } from "@mui/material";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouteError } from "react-router-dom";

type Props = {
  title?: string;
  message?: string;
};

/**
 * エラー画面
 * @param param0
 * @returns
 */
export const Error = ({ title, message }: Props) => {
  const error = useRouteError() as AxiosError<{
    statusCode: number;
    title: string;
    message: string;
  }>;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Box
      role="alert"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
    >
      <h1>{title || error.response?.data.title || "エラーが発生しました。"}</h1>
      <p>{message || error.response?.data.message || error.message}</p>
      <Button
        variant="outlined"
        onClick={() => {
          reset();
          window.location.assign(window.location.origin);
        }}
      >
        ホームへ
      </Button>
    </Box>
  );
};
