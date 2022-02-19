import {TEMPLATE_ITEM_BUTTON} from "../../shared/styles";

export const NAVIGATION = {
    paddingLeft: "as",
};
export const NAV_ITEM = {
    fontFamily: "Montserrat",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
    letterSpacing: "0.01em",
    color: "#3C3C3C",
    cursor: "pointer",
};
export const NAV_CONTAINER = {
    display: "flex",
    gap: "40px",
};

export const LOGO_NAV_CONTAINER = {
    display: "flex",
    alignItems: "center",
    gap: "89px",
};

export const LOGO = {
    fonFamily: "Poppins",
    fontSize: "28px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "42px",
    letterSpacing: "0.02em",
    color: "#8C0DF0",
};

export const MAIN_CONTAINER_NAV = {
    pl: "60px",
    pr: "60px",
    boxShadow: "0px 2px 12px 0px #2F2F2F0A",
    height: "74px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

export const ACTIONS = {
    display: "flex",
    gap: "24px",
};

export const SECONDARY_BUTTON = {
    ...TEMPLATE_ITEM_BUTTON,
    color: "#5D00A6",
    border: "1px solid #5D00A6",
    width: "100px",
};

export const PRIMARY_BUTTON = {
    ...TEMPLATE_ITEM_BUTTON,
    alignItems: "center",
    width: "100px",
    color: "#FFFFFF",
    "&:hover": {
        background: "#8C0DF0",
    },
    "&.Mui-disabled": {
        background: "#9F9F9F",
    },
    background: "#8C0DF0",
};
export const IMAGE_TEXT_CONTAINER = {
    display: "flex",
    justifyContent: "space-between",
    paddingX: "60px",
    paddingTop: "58px",
    mb: "98px",
};
export const FIRST_HEADER = {
    fontFamily: "Montserrat",
    fontSize: "38px",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "46px",
    letterSpacing: "0.01em",
    mt: "38px",
};
export const SECOND_HEADER = {
    fontFamily: "Montserrat",
    fontSize: "38px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "46px",
    letterSpacing: "0.01em",
    mt: "13px",
};
export const PARAGRAPH = {
    width: "453px",
    height: "144px",
    fontFamily: "Montserrat",
    fontSize: "20px",
    fontWeight: 400,
    lineHeight: "24px",
    letterSpacing: "0.01em",
    mt: "41px",
};
export const DEVIDER = {
    height: "2px",
    background: "#E3E3E3",
    borderRadius: "3px",
    width: "76%",
    margin: "auto",
};
export const BORDER_RIGHT = {
    width: "19px",
    height: "437px",
    background: "#8C0DF0",
    marginTop: "19px",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px",
};

export const BORDER_BOTTOM = {
    width: "743px",
    height: "19px",
    background: "#8C0DF0",
    marginLeft: "19px",
    marginTop: "-19px",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
};

export const IMAGE = {
    width: "743px",
    height: "437px",
};