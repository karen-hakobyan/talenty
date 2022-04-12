import {useState} from "react";
import {SelectIconSVG} from "../../assets/icons/createTemplate";
import {MenuItem} from "@mui/material";
import TextField from "./Textfield";

export default function Select({
                                   value = 'none',
                                   menuItems = [],
                                   textFieldWidth,
                                   fieldStyle = {},
                                   placeHolder,
                                   selectProps = {},
                                   ...restProps
                               }) {
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(false)
    return <TextField
        sx={{
            width: textFieldWidth || '500px',
            '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                color:value ==='none'? '#8C8C8C':"rgba(0, 0, 0, 0.87)",
                fontFamily: "'Poppins', sans-serif",
                fontSize:16
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
            ...selectProps
        }}
        {...restProps}
    >
        {placeHolder &&
            <MenuItem value="none" disabled sx={{display: 'none', color: "#4C494F"}}>{placeHolder}</MenuItem>}
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
                    fontFamily: "'Poppins', sans-serif",
                    lineHeight: '24px',
                }}
            >
                {el}
            </MenuItem>
        })}
    </TextField>
}


export function MultipleSelect({
                                   value = [],
                                   menuItems = [],
                                   textFieldWidth,
                                   fieldStyle = {},
                                   placeHolder,
                                   selectProps = {},
                                   ...restProps
                               }) {
    return <TextField
        sx={{
            width: textFieldWidth || '500px',
            color: '#8C8C8C',
            '.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
                color:value ==='none'? '#8C8C8C':"rgba(0, 0, 0, 0.87)",
                fontFamily: "'Poppins', sans-serif",
                fontSize:16
            },
            ...fieldStyle,
        }}
        value={value || []}
        select
        SelectProps={{
            IconComponent: SelectIconSVG,
            sx: {
                '.MuiSelect-icon': {
                    marginRight: '10px'
                },
                height: '40px',
            },
            multiple: true,
            renderValue: (value) => {
                return value.length ? value.join(',') : placeHolder
            },
            displayEmpty: true,
            ...selectProps,
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
                    fontFamily: "'Poppins', sans-serif",
                    lineHeight: '24px',
                }}
            >
                {el}
            </MenuItem>
        })}
    </TextField>
}
