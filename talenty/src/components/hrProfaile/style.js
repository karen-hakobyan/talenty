import { MAIN_PURPLE } from "../../style/colors"
import { MONTSERRAT } from "../dialogs/constants"

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