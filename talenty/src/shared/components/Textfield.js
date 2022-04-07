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
                    }
                },
                ...sx,
            }
        }
        {...restProps}
        InputProps={{
            sx: {height: "40px"},
            ...(restProps.InputProps || {})
        }}
    />
}
