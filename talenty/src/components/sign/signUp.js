import { styled, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { HEADER_TEXT, MAIN_PURPLE, TEXT } from "../../constants/colors";

export const StyledContainer = styled(Box)({
    p: 0,
    m: 0,
    display: "flex",
});
export const H1 = styled("h1")({
    fontWeight: 600,
    fontSize: 25,
    letterSpacing: "0.04em",
    color: HEADER_TEXT,
    marginTop: 24,
    marginBottom: 10,
    fontFamily: "Proxima Nova",
});
export const StyledDiv = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "left",
    width: "100%",
    mardinTop: 10,
    fontFamily: "Proxima Nova",
    p: {
        fontFamily: "Proxima Nova",
    },
});
export const MainStyledSpan = styled("span")({
    color: MAIN_PURPLE,
    cursor: "pointer",
});
export const style = {
    width: "35vw",
    innerHeight: "auto",
    display: "flex",
    flexDirection: "column",
    pt: "2%",
    pl: "6%",
    marginBottom: 5,
};
export const StyledBGImage = styled("div")({
    img: {
        height: "100%",
        widht: "auto",
        minHeight: "23.75rem",
        maxWidth: "35rem",
    },
    position: "relative",
});

export const StyledSpan = styled("span")({
    fontFamily: "Proxima Nova",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    marginTop: 12,
    paddingBottom: 5,
    color: TEXT,
});
export const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
            borderColor: MAIN_PURPLE,
            paddingBottom: 1,
        },
    },
    color: TEXT,
    paddingTop: 1,
    width: "100%",
});