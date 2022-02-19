import {FormControl, InputLabel, Select as MuiSelect} from "@mui/material";
import {SelectIconSVG} from "../../assets/icons/createTemplate";

const style = {
    width: "421px",
    background: "#F5F5F5",
    "&.Mui-disabled": {
        bakcground: "#F5F5F5",
    },
};

const labelStyle = {
    fontWeight: 400,
    fontSize: "16px",
    color: "#BFBFBF",
    lineHeight: "24px",
    height: "40px",
};

const Select = ({sx = {}, disabled, placeHolder, ...restProps}) => {
    return (
        <FormControl size="small">
            <InputLabel sx={labelStyle}>
                {placeHolder || "Choose the gender"}
            </InputLabel>
            <MuiSelect
                sx={{...style, ...sx, height: "40px"}}
                IconComponent={SelectIconSVG}
                disabled={disabled}
                {...restProps}
            />
        </FormControl>
    );
};

export default Select;
