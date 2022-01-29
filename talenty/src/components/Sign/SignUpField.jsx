import { Box, TextField } from "@mui/material";
import React from "react";

const SignUpField = React.forwardRef(
  ({ register, value, isPassword, objKey }, ref) => {
    return (
      <Box
        sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
        {...{ ref }}
      >
        <Box>{value}</Box>
        <TextField
          {...(isPassword ? { type: "password" } : {})}
          sx={{ width: "466px" }}
          {...register(objKey)}
          placeholder={value}
        />
      </Box>
    );
  }
);

export default SignUpField;
