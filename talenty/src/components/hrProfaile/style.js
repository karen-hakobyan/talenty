import { MAIN_PURPLE, TEXT } from "../../style/colors"
import { MONTSERRAT, POPPINS } from "../dialogs/constants"

export const TITLE = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "36px",
    color: "#000",
    mb: "13px"
}
export const ADD_FILED = {
    fontFamily: MONTSERRAT,
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "22px",
    color: MAIN_PURPLE,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    "& span": {
        mr: "5px"
    }
}
export const MODIFIED_VALUE_STYLE = (type) => ({
    fontFamily: POPPINS,
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: "16px",
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: type === "URL" ? "#1060FD" : TEXT,
    display: "flex",
    flex: 1,
    cursor: "pointer",
    alignItems: "center",
    height: "40px",
    width: "60px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    position: "relative",
})
export const SECTION_STYLE = {
    fontFamily: POPPINS,
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "22px",
    mr: "15px"
}