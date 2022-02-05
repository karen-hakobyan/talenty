import { Checkbox as MuiCheckbox } from "@mui/material";
import { CheckIconSVG } from "../../assets/icons/createTemplate";

const Checkbox = ({ sx = {}, disabled, checked, ...restProps }) => {
  // Materials checked className is primary then disabled so it ovverrides
  return (
    <MuiCheckbox
      checked={checked}
      disabled={disabled}
      icon={<CheckIconSVG />}
      sx={{
        "&.MuiCheckbox-root": {
          width: "22px",
          height: "22px",
          borderRadius: "2px",
          border: "1px solid #D9D9D9",
          ...(checked && disabled
            ? {
                color: "#F5F5F5",
              }
            : checked && !disabled
            ? {
                color: "#8C0DF0",
                border: "none",
              }
            : {}),
        },
        "&.Mui-checked": !disabled ? { color: "#8C0DF0", border: "none" } : {},
        "&.Mui-disabled": { background: "#F5F5F5" },
        ...sx,
      }}
      {...restProps}
    />
  );
};

export { Checkbox };
