import * as React from "react";
import MuiButton from "@mui/material/Button";

type ButtonProps = {
  title: string;
  color: "primary" | "secondary";
  size: "small" | "medium" | "large";
};

export const Button = (props: ButtonProps) => {
  return (
    <MuiButton variant="contained" color={props.color} size={props.size}>
      {props.title}
    </MuiButton>
  );
};
