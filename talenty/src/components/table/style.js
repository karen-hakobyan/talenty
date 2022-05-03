import {MAIN_PURPLE, TEXT, WHITE} from "../../style/colors"

export const TABLE_CONTAINER = {
    overflow: "hidden",
    border: "none",
    boxShadow: "none"
}
export const TABLE_HEAD_FONST_STYLE = {
    backgroundColor: MAIN_PURPLE,
    '&:last-child': {borderRight: "nana"},
    border: "1px solid #C4C4C4",
}
export const TABLE_CELL_STYLE = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 800,
    borderRight: "1px solid #C4C4C4",
    borderBottom: "none",
    fontSize: 16,
    letterSpacing: "0,02em",
    color: WHITE,
    height: 47,
    padding: "0 12px",
    "&:nth-of-type(1)": {
        fontWeight: 400,
        maxWidth: "80px",
        width: "70px"
    },
    "&:nth-last-of-type(1)": {
        borderRight: "none",
    },
}
export const TABLE_FLEX = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}
export const TABLE_BODY_STYLE = {
    border: "1px solid #C4C4C4",
    padding: 0,
    '&:last-child': {borderRight: "none"},
    "& td": {
        fontFamily: "'Poppins', sans-serif",
        fontSize: 16,
        letterSpacing: "0,02em",
        color: TEXT,
        borderRight: "1px solid #C4C4C4",
        height: "47px",
        padding: 0,
        paddingLeft: "12px",

    },
    "& td:nth-of-type(1)": {paddingRight: "20px"},
    "& td:nth-last-of-type(3)": {color: "#265BD2"},
    "& td:nth-last-of-type(2)": {
        padding: 0,
        width: "153px"
    },

    "& td:last-child": {
        borderRight: "none"
    }
}
export const FLEX_CENTER = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}
export const SPAN_STYLE = {
        "& span": {
            marginRight: "8px"
        },
    }
    // pending
export const PENDING__BODY_STYLE = {
    border: "1px solid #C4C4C4",
    padding: 0,
    '&:last-child': { borderRight: "none" },
    "& td": {
        fontFamily: "'Poppins', sans-serif",
        fontSize: 16,
        letterSpacing: "0,02em",
        color: TEXT,
        borderRight: "1px solid #C4C4C4",
        height: "47px",
        padding: 0,
        paddingLeft: "12px",

    },
    "& td:last-child": {
        borderRight: "none"
    },
    "& td:nth-of-type(1)": { paddingRight: "20px" },
}