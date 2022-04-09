import {Button} from "@mui/material";
import {ELECTRICVIOLET, WHITE} from "../constants/colors";
import "../fonts/index.css";

function MuiContainedBtn({bgColor, children, onClick, Width}) {
    return (
        <Button
            onClick={onClick}
            sx={{
                background: bgColor || ELECTRICVIOLET,
                "&:hover": {background: "#5f2989"},
                height: "40px",
                maxWidth: Width ? Width : "466px",
                width: "100%",
                outline: "none",
                borderRadius: "4px",
                marginTop: "26px",
                transition: "all 0.4s",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "16px",
                lineHeight: "22px",
                color: WHITE,
            }}
            variant="contained"
        >
            {children}
        </Button>
    );
}

export default MuiContainedBtn;
