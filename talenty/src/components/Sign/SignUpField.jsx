import { Box, TextField } from "@mui/material";
import React from "react";
import { MAIN_PURPLE } from "../../constants/colors";

const SignUpField = React.forwardRef(
  ({ register, value, isPassword, objKey, errors, error }, ref) => {
    console.log(errors);
    return (
      <Box
        sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
        {...{ ref }}
      >
        <Box>{value}</Box>
        <TextField
          {...(isPassword ? { type: "password" } : {})}
          sx={{ width: "466px",
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" :{
            borderColor: MAIN_PURPLE,
        }
        }}
          {...register(objKey, error)}
          placeholder={value}
          error={!!errors?.[objKey]}
          helperText={errors[objKey] ? errors[objKey].message : ""}
        />
      </Box>
    );
  }
);

export default SignUpField;
