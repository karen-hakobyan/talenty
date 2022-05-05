import { Box } from "@mui/material";
import { MAIN_BOX_STYLE } from "./style";

export default function MainBox({ children, isRegardingJobs, sx = {} }) {
  return (
    <Box
      sx={{
        ...MAIN_BOX_STYLE,
        ...(isRegardingJobs ? { pt: "34px" } : { pt: "26px" }),
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
