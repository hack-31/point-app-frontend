import * as React from "react";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Layout = () => {
  return (
    <>
      <Suspense
        fallback={
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
};
