import {TextField as MuiTextField} from "@mui/material";

export default function TextField({sx, ...restProps}) {
    if(restProps.InputProps) {
        restProps.InputProps = {...restProps.InputProps, sx: {height: '40px'} }
    }
    return <MuiTextField sx={sx} InputProps={{sx: {height: "40px"}}} {...restProps}/>
}
