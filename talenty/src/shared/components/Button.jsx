import { Button as MuiButton } from "@mui/material";

export default function Button({ sx = {}, children, ...restProps }) {
  return (
    <MuiButton sx={sx} style={{ textTransform: "none" }} {...restProps}>
      {children}
    </MuiButton>
  );
}
