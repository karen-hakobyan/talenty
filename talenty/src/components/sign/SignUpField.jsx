import React, { useState } from "react";
import { Box, IconButton,  TextField } from "@mui/material";
import { MAIN_PURPLE } from "../../constants/colors";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const SignUpField = React.forwardRef(
  ({ register, value, isPassword, objKey, errors, error }, ref) => {
    const [showPass, setShowPass]=useState(false)

    return (
      <Box
        sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
        {...{ ref }}
      >
        <Box sx={{ fontFamily: "Proxima Nova",
            fontSize: "16px",
            fontWeight: "400px",
            lineHeight: "24px",
            letterSpacing: "0em",
          }}>{value}</Box>
        <TextField
          {...(isPassword && !showPass ? { type: "password" } : {})}
          InputProps={{sx:{ height: '40px'}, endAdornment: isPassword? 
          <IconButton onClick={()=>setShowPass(!showPass)}>
            {showPass? <VisibilityOutlinedIcon color="#4C494F" fontSize="small" />: <VisibilityOffOutlinedIcon color="#4C494F" fontSize="small"/> }
          </IconButton>:null}}
          sx={{ width: "466px",
          ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline" :{
            borderColor: MAIN_PURPLE,  
        },
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
