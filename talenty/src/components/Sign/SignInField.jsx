import React from "react";
import { Box, TextField } from "@mui/material";

const SignInField = React.forwardRef(
  (
    {
      label,
      register,
      objKey,
      isPassword,
      error,
      errors, // use form hook errors
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
          sx={{ width: "466px", height: "40px" }}
          {...register(objKey, error || {})}
          placeholder={label}
          error={!!errors?.[objKey]}
          helperText={errors[objKey] ? errors[objKey].message : ""}
        />
      </Box>
    );
  }
);

export default SignInField;
