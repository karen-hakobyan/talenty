import React, { useState } from "react";
import { Box, IconButton,  TextField } from "@mui/material";
import { ShowPasswordClose, ShowPasswordOpen } from "../../assets/sign";
import { MAIN_PURPLE } from "../../constants/colors";

const SignUpField = React.forwardRef(
  ({ register, value, isPassword, objKey, errors, error }, ref) => {
    const [showPass, setShowPass]=useState(false)

    return (
      <Box
        sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
        {...{ ref }}
      >
        <Box>{value}</Box>
        <TextField
          {...(isPassword && !showPass ? { type: "password" } : {})}
          InputProps={{sx:{ height: '40px'}, endAdornment: isPassword? 
          <IconButton onClick={()=>setShowPass(!showPass)}>
            {showPass? <ShowPasswordOpen />: <ShowPasswordClose/> }
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
