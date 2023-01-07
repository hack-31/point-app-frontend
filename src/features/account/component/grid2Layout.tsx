import { Box } from "@mui/material";
import React from "react";

type Props = {
  title: React.ReactNode;
  value: React.ReactNode;
};
/**
 * １：２のグリッドレイアウト
 *
 * 1:2=title:value
 *
 * レスポンシブ対応しており、スマホでは１列になる
 */
export const Grid2Layout = React.memo(({ title, value }: Props) => {
  return (
    <Box
      display="flex"
      my="30px"
      flexDirection="column"
      sx={[
        ({ breakpoints }) => ({
          [breakpoints.up("sm")]: {
            flexDirection: "row",
          },
        }),
      ]}
    >
      <Box
        component="h3"
        flex="1"
        color="primary.main"
        sx={[
          ({ breakpoints }) => ({
            [breakpoints.up("sm")]: {
              my: 0,
            },
          }),
        ]}
      >
        {title}
      </Box>
      <Box flex="2">{value}</Box>
    </Box>
  );
});
