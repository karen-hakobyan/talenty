import {TextField as MuiTextField} from "@mui/material";

export default function TextField({sx, ...restProps}) {
    if (restProps.InputProps) {
        restProps.InputProps = {...restProps.InputProps, sx: {height: '40px'}}
    }
    return <MuiTextField
        sx={
            {
                '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
                    '&::placeholder': {
                        fontSize: '16px',
                        lineHeight: '24px',
                        fontWeight: 400,
                        fontFamily: "'Poppins', sans-serif",
                        opacity: 1,
                        color: '#8C8C8C',
                    },
                },
                '.css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input': {
                    pl: '10px',
                },
                ...sx,
            }
        }
        {...restProps}
        FormHelperTextProps={
            {
                sx: {fontFamily: "'Poppins', sans-serif"}
            }
        }
        InputProps={
            {
                sx: {height: "40px"},
                ...(restProps.InputProps || {}),
            }
        }
    />
}