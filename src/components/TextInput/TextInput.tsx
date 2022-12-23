import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type TextInputProps = {
  placeholder: string;
  id: string;
  value: string;
};

export const FormPropsTextFields = (props: TextInputProps) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": {},
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id={props.id}
          value={props.value}
          style={{ backgroundColor: "white" }}
          placeholder={props.placeholder}
          type="search"
          color="primary"
          size="small"
        />
      </div>
    </Box>
  );
};
