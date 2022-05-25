import React, { useState } from "react"
import { Box, TextField } from "@mui/material"
import { Chek, Delete } from "../../assets/icons/hrProfile"
import { MAIN_PURPLE } from "../../style/colors"

export const SocialLinks = React.forwardRef(({ placeholder, onClose }, ref) => {
    const [value, setValue] = useState("")
    return <Box sx={{
        position: "absolute",
        top: "40px",
        right: 0
    }}>
        <TextField
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            InputProps={{
                sx: {

                    height: "40px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 15,
                    boxSizing: "border-box",
                },
                endAdornment: <Box sx={{
                    display: 'flex',
                }}>
                    <Box sx={{
                        mr: "23.75px",
                        cursor: "pointer"
                    }}
                    // onClick={onClose}
                    onClick={() => onClose()}
                    ><Chek /></Box>
                    <Box sx={{
                        cursor: "pointer"
                    }}
                        onClick={() => {
                            setValue("")
                        }}
                    ><Delete  /></Box>
                </Box>
            }}
            sx={{
                boxSizing: "border-box",
                width: "461px",
                ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
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

            }}
        />
    </Box>
})
