import { Box } from "@mui/material";

export function SubSection({ lable, children, sx, ...props }) {
  return (
    <Box>
      <Box
        sx={{
          fontFamily: "Poppins",
          fontStyle: "normal",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "36px",
          mb: "22px",
        }}
      >
        {lable}
      </Box>
      <Box sx={{ ...sx }}>{children}</Box>
    </Box>
  );
}

export function SubFields() {}
