import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { MAIN_PURPLE } from "../../constants/colors";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
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
    const [showPass, setShowPass]=useState(false)
    
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
          InputProps={{sx:{height: "40px"},endAdornment: isPassword? 
          <IconButton onClick={()=>setShowPass(!showPass)}>
            {showPass? <VisibilityOutlinedIcon color="#4C494F" fontSize="small" />: <VisibilityOffOutlinedIcon color="#4C494F" fontSize="small"/>}
          </IconButton>:null}}
          {...(isPassword && !showPass ? { type: "password" } : {})}
          sx={{
            width: "466px",
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
