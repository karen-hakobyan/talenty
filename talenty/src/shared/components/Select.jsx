import {useState} from "react";
import {SelectIconSVG} from "../../assets/icons/createTemplate";
import {MenuItem} from "@mui/material";
import TextField from "./Textfield";

export default function Select({value, menuItems, textFieldWidth, ...restProps}) {
    const [open, setOpen] = useState(false)
    return <TextField
        sx={{
            width: textFieldWidth || '500px',
            color: '#8C8C8C',
            '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                color: '#8C8C8C',
            },
        }}
        value={value}
        onClick={() => setOpen(prev => !prev)}
        select
        SelectProps={{
            IconComponent: SelectIconSVG,
            sx: {
                '.MuiSelect-icon': {
                    marginRight: '10px'
                },
                height: '40px'
            },
            open,
        }}
        {...restProps}
    >
        {menuItems.map(el => {
            return <MenuItem value={el} key={el}>{el}</MenuItem>
        })}
    </TextField>
}