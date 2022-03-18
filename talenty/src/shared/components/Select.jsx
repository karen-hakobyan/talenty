import {useState} from "react";
import {SelectIconSVG} from "../../assets/icons/createTemplate";
import {MenuItem} from "@mui/material";
import TextField from "./Textfield";

export default function Select({value, menuItems, textFieldWidth, fieldStyle = {}, laceholder,placeholderInput, ...restProps}) {
    const [open, setOpen] = useState(false)
    return <TextField
        placeholder ={placeholderInput? placeholderInput : ""} 
        sx={{
            width: textFieldWidth || '500px',
            color: '#8C8C8C',
            '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                color: '#8C8C8C',
            },
            ...fieldStyle,
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
                height: '40px',
            },
            open,
        }}
        {...restProps}
    >
        {menuItems.map((el) => {
            return <MenuItem
                value={el}
                key={el}
                sx={{
                    '&:hover': {
                        background: 'rgba(140, 13, 240, 0.14)',
                    },
                    '&.Mui-selected': {
                        background: '#8C0DF024'
                    },
                    color: '#4C494F',
                    fontSize: '16px',
                    fontWeight: 400,
                    fontFamily: 'Proxima Nova',
                    lineHeight: '24px',
                }}
            >
                {el}
            </MenuItem>
        })}
    </TextField>
}
