import { Button } from "@mui/material";

function MuiContainedBtn({ bgColor, children, onClick }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        w: "100%",
        background: bgColor || "",
        "&:hover": { background: "#5f2989" },
      }}
      variant="contained"
    >
      {children}
    </Button>
  );
}

export default MuiContainedBtn;
