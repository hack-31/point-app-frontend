import * as React from 'react';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  // children: React.ReactNode;
  title: string;
};

export const Header = ({ title = "360°評価システム" }: HeaderProps) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};



// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
// const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
//   setAnchorEl(event.currentTarget);
// }
// const handleClose = () => {
//   setAnchorEl(null);
// };
// childrenを以下にするとアイコン登場
{/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>アカウント情報</MenuItem>
                <MenuItem onClick={handleClose}>サインアウト</MenuItem>
              </Menu> */}