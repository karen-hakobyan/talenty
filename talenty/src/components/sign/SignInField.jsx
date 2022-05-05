import React, {useState} from "react";
import {Box, IconButton, TextField} from "@mui/material";
import {MAIN_PURPLE} from "../../style/colors";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const SignInField = React.forwardRef(
    (
        {
            label,
            placeholder,
            register,
            objKey,
            isPassword,
            error,
            errors, // use form hook errors
            ...restProps
        },
        ref
    ) => {
        const [showPass, setShowPass] = useState(false)

        return (
            <Box

                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    ...(errors[objKey] ? {mb: "15px"} : {}),
                }}
                {...{ref}}
            >
                <Box
                    sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        fontWeight: "400px",
                        lineHeight: "24px",
                        letterSpacing: "0em",
                    }}
                >
                    {label}
                </Box>
                <TextField
                    InputProps={{
                        sx: {
                            height: "40px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: 15,
                            boxSizing: "border-box",
                        }, endAdornment: isPassword ?
                            <IconButton onClick={() => setShowPass(!showPass)}>
                                {showPass ? <VisibilityOutlinedIcon color="#4C494F" fontSize="small"/> :
                                    <VisibilityOffOutlinedIcon color="#4C494F" fontSize="small"/>}
                            </IconButton> : null
                    }}
                    {...(isPassword && !showPass ? {type: "password"} : {})}
                    sx={{
                        boxSizing: "border-box",
                        width: "466px",
                        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{
                            boxSizing: "border-box",
                        },
                        ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                                borderColor: MAIN_PURPLE,
                            },
                        "&::placeholder": {
                            fontFamily: "'Poppins', sans-serif",
                            fontStyle: "normal",
                            fontWeight: "normal",
                            fontSize: "15px",
                            lineHeight: "24px",
                        },
                        // "& input:-internal-autofill-selected":{
                        //     color:"red !important",
                        //     backgroundColor:"red !important"
                        // }
                    }}
                    // autoComplete="off"
                    {...register(objKey, error || {})}
                    placeholder={placeholder}
                    error={!!errors?.[objKey]}
                    helperText={errors[objKey] ? errors[objKey].message : ""}
                    FormHelperTextProps={{
                        sx: {fontFamily: "'Poppins', sans-serif"}
                    }}
                    {...restProps}
                />
            </Box>
        );
    }
);

export default SignInField;
