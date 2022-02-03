import React from "react";
import { Box, TextField } from "@mui/material";
import { MAIN_PURPLE } from "../../constants/colors";

const SignInField = React.forwardRef(
  (
    {
      label,
      register,
      objKey,
      isPassword,
      error,
      errors, // use form hook errors
      ...restProps
    },
    ref
  ) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          ...(errors[objKey] ? { mb: "15px" } : {}),
        }}
        {...{ ref }}
      >
        <Box
          sx={{
            fontFamily: "Proxima Nova",
            fontSize: "16px",
            fontWeight: "400px",
            lineHeight: "24px",
            letterSpacing: "0em",
          }}
        >
          {label}
        </Box>
        <TextField
          {...(isPassword ? { type: "password" } : {})}
          sx={{
            width: "466px",
            height: "40px",
            ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: MAIN_PURPLE,
              },
          }}
          {...register(objKey, error || {})}
          placeholder={label}
          error={!!errors?.[objKey]}
          helperText={errors[objKey] ? errors[objKey].message : ""}
          {...restProps}
        />
      </Box>
    );
  }
);

export default SignInField;
