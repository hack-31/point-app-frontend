import { useAuth } from "@/lib/auth";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHandleMenu } from "./hooks";

export const Header = React.memo(() => {
  const { user, logout } = useAuth();
  const { anchorEl, closeMenu, openMenu } = useHandleMenu();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
          align="center"
        >
          <Link to="/">ポイントアプリ</Link>
        </Typography>
        {user && (
          <>
            <IconButton
              size="large"
              aria-label="ユーザメニュー"
              onClick={openMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={closeMenu}
            >
              <MenuItem
                onClick={() => {
                  closeMenu();
                  navigate("/account");
                }}
              >
                アカウント情報
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  closeMenu();
                  logout();
                }}
              >
                サインアウト
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
});
