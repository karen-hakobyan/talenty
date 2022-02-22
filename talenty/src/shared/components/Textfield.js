import {TextField as MuiTextField} from "@mui/material";

export default function TextField({sx, ...restProps}) {
    return <MuiTextField sx={sx} {...restProps} InputProps={{sx: {height: "40px"}}} />
}