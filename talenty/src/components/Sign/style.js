import { MAIN_PURPLE } from "../../constants/colors";

export const flexContainer = {
    width: "580px",
    height: "290px",
    paddingBottom: "31px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: "84px",
    alignItems: "center",
};
export const BOTTOM_ITEMS = {
    display: "flex",
    flexDirection: "column",
};
export const DIALOG_TEXT = {
    textAlign: "center",
    fontSize: "16px",
    lineHeight: "26px",
    fontFamily: "Proxima Nova",
};
export const CHECKBOX_CONTAINER = {
    display: "flex",
    alignItems: "center",
    span: { p: 0 },
    mb: 2,
}
export const CHECKBOX_STYLE = {
    "& .MuiSvgIcon-root": { fontSize: 28, color: MAIN_PURPLE },
}