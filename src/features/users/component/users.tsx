import { useAuth } from "@/lib/auth";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getUsers, queryKey } from "../api/getUsers";

type Props = {
  onClick: (user: {
    acquisitionPoint: number;
    email: string;
    familyName: string;
    familyNameKana: string;
    firstName: string;
    firstNameKana: string;
    id: number;
  }) => void;
};
/**
 * ユーザ一覧表示機能コンポーネント
 */
export const Users = React.memo(({ onClick }: Props) => {
  const { user } = useAuth();
  const { data } = useQuery(queryKey, getUsers);

  return (
    <Box className="App" mx="auto">
      <Box display="flex" alignItems="flex-end" borderRadius="8px">
        <Box color="primary.main">送付可能ポイント:</Box>
        <Box
          color="#F18D5F"
          fontWeight="800"
          fontSize="20px"
          mr="10px"
          ml="10px"
        >
          {user?.sendablePoint}
        </Box>
        <Box fontSize="12px" lineHeight="15px" color="primary.main">
          pt
        </Box>
      </Box>
      <Box my="40px" />
      <Box component="h1" color="primary.main">
        メンバー一覧
      </Box>
      <Box component="p" color="primary.light">
        頑張っているなぁと思う人にポイントを贈ろう!
      </Box>
      <Box my="60px" />
      <Grid
        container
        spacing={{ xs: 3, sm: 3, md: 3 }}
        columns={{ xs: 12, sm: 12, md: 12 }}
      >
        {data?.data.data.users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardActionArea onClick={() => onClick(user)}>
                <CardContent>
                  <Box
                    display="flex"
                    fontWeight="800"
                    fontSize="1.5rem"
                    color="primary.main"
                  >
                    <Box
                      mr="10px"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                    >
                      {user.familyName}
                    </Box>
                    <Box
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      flex={1}
                    >
                      {user.firstName}
                    </Box>
                    <ArrowForwardIosIcon sx={{ color: "#DDD3CE" }} />
                  </Box>
                  <Box
                    color="primary.light"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                  >
                    {user.email}
                  </Box>
                  <Box my="90px" />
                  <Box display="flex" alignItems="flex-end">
                    <Box flex={1}>現在の獲得ポイント:</Box>
                    <Box
                      color="#F18D5F"
                      fontWeight="800"
                      fontSize="20px"
                      mr="10px"
                    >
                      {user.acquisitionPoint}
                    </Box>
                    <Box fontSize="12px" lineHeight="15px">
                      pt
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});
