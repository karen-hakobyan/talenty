import { MenuItem, Select as MuiSelect, Box } from "@mui/material";
import { useState } from "react";
import { SelectIconSVG } from "../../assets/icons/createTemplate";

const style = {
  width: "421px",
  "&.Mui-disabled": {
    background: "#F5F5F5",
  },
  //   "&.MuiInputBase-root.Mui-disabled": {
  //     color: "red",
  //   },
};

const Select = ({ sx = {}, disabled, ...restProps }) => {
  const [value] = useState("Choose the gender");
  // apply some value to display placeholder after setting inputComponent the icon disapears wtf??
  return (
    <MuiSelect
      value={value}
      {...restProps}
      sx={{
        ...style,
        ...sx,
      }}
      IconComponent={SelectIconSVG}
      disabled={disabled}
      renderValue={() => {
        return (
          <Box
            sx={{
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            Choose the gender
          </Box>
        );
      }}
    >
      <MenuItem value="Choose the gender" />
    </MuiSelect>
  );
};

export default Select;
