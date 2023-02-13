import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};
/**
 * 設定画面おサイドバーコンポーネント
 * mainコンテンツは子コンポーネントに指定すること
 * @param param0.children メインコンテンツ
 */
export const SideBarLayout = React.memo(({ children }: Props) => {
  const navigationList = [
    { link: "account", text: "アカウント情報" },
    { link: "password-update", text: "パスワード更新" },
  ];
  // レスポンシブかどうかを取得する
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  return (
    <Box
      maxWidth="1200px"
      display="flex"
      flexDirection="column"
      sx={[
        ({ breakpoints }) => ({
          [breakpoints.up("sm")]: {
            mt: "100px",
            flexDirection: "row",
          },
        }),
      ]}
    >
      <Box
        sx={{
          overflow: "auto",
          "& .active": {
            color: "#bbb",
          },
          "& .active .MuiListItemIcon-root": {
            color: "#bbb",
          },
        }}
        flex={1}
      >
        <List>
          {navigationList.map((navigateion) => (
            <NavLink
              key={navigateion.link}
              to={`/${navigateion.link}`}
              className={({ isActive, isPending }) =>
                isActive ? "active" : isPending ? "pending" : ""
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={navigateion.text} />
                  {isMobile ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Box>
      <Box
        flex={4}
        sx={[
          ({ breakpoints }) => ({
            [breakpoints.up("sm")]: {
              ml: "100px",
            },
          }),
        ]}
      >
        {children}
      </Box>
    </Box>
  );
});