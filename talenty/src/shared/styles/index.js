import { DIALOG_TITLE_COLOR, MAIN_PURPLE, TEXT } from "../../style/colors";

const TEMPLATE_ITEM_BUTTON = {
    display: "flex",
    gap: 1,
    fontSize: "14px",
    lineHeight: "22px",
    fontFamily: "'Poppins', sans-serif",
    width: "94px",
    height: "34px",
    borderRadius: "6px",
    color: "#616162",
    border: "1px solid #ECECEC",
};
const FLEX_CONTAINER = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
};
export const PINK_BUTTON = {
    ...TEMPLATE_ITEM_BUTTON,
    width: "179px",
    color: "#FFFFFF",
    "&:hover": {
        background: "#8C0DF0",
    },
    "&.Mui-disabled": {
        background: "#9F9F9F",
    },
    background: "#8C0DF0",
};

const TEMPLATE_ITEM_BUTTON_DISABLED = {
    ...TEMPLATE_ITEM_BUTTON,
    color: "9F9F9F",
    border: "1px solid #EFEFEF",
    background: "#EFEFEF",
    cursor: "default",
    "&:hover": { background: "#EFEFEF" },
};

const INPUT_LABEL = {
    color: "#4C494F",
    lineHeight: "24px",
    fontSize: 18,
    marginBottom: "10px",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    width: "100%",
    gap: "5px",
};

const TEMPLATE_INPUT = { width: "421px" };
const DISABLED_INPUT = { background: "#F5F5F5" };
const TEMPLATE_BUTTON_ADD = {
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    // width: "179px",
    height: "34px",
    justifyContent: "center",
    alignItems: "center",
    gap: "9px",
    fontSize: 15,
    borderRadius: "6px",
    border: "1px solid #ECECEC",
    cursor: "pointer",
    padding: "0 8px"
};
const TEMPLATE_BUTTON_CREATE = {
    ...TEMPLATE_BUTTON_ADD,
    color: "#FFF",
    background: "#8C0DF0",
    "&:hover": {
        background: "#8C0DF0",
    },
    "&.Mui-disabled": {
        background: "#9F9F9F",
        color: "#FFF",
    },
    textTransform: "none"
};
const HOME_PRIMARY_BUTTON = {
    ...TEMPLATE_BUTTON_CREATE,
    fontSize: "14px",
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
    lineHeight: "22px",
    width: "179px",
};
const ADD_TEMPLATE_SECTION = {
    height: "34px",
    width: "179px",
    color: "#FFFFFF",
    "&:hover": {
        background: "#8C0DF0",
    },
    "&.Mui-disabled": {
        color: "#EFEFEF",
        background: "#9F9F9F",
        "&:hover": {
            background: "#9F9F9F",
        },
    },
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif",
    lineHeight: "22px",
    background: "#8C0DF0",
};
const DIALOG_TITLE_CONTAINER = {
    fontSize: "18px",
    lineHeight: "18px",
    fontWeight: 600,
    color: "#4C494F",
    fontFamily: "'Poppins', sans-serif",
};

const DIALOG_MAIN_CONTAINER = {
    width: "1142px",
    padding: "36px 52px",
};

const DIALOG_ADD_SECTION_CONTAINER = {
    height: "292px",
    width: "569px",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingLeft: "24px",
};
const GLOBAL_TEXT = {
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 16,
    color: TEXT,
};
const LINE = {
    width: "100%",
    height: "2px",
    background: "#D2D2D2",
    mt: "20px",
};
const TEXT_FIELD = {
    ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: MAIN_PURPLE,
    },
};

const INPUT_VALUE_STYLE = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#4C494F',
}
const TEMPLATE_TITLE = {
    ...INPUT_VALUE_STYLE,
    color: DIALOG_TITLE_COLOR
}
const DIALOG_BUTTON_PURPLE = {
    ...TEMPLATE_ITEM_BUTTON,
    textTransform: "none",
    width: "179px",
    color: "#FFFFFF",
    "&:hover": {
        background: "#8C0DF0",
    },
    "&.Mui-disabled": {
        background: "#9F9F9F",
    },
    background: "#8C0DF0",
}

export {
    GLOBAL_TEXT,
    DIALOG_TITLE_CONTAINER,
    DIALOG_MAIN_CONTAINER,
    TEMPLATE_ITEM_BUTTON,
    DIALOG_ADD_SECTION_CONTAINER,
    TEMPLATE_ITEM_BUTTON_DISABLED,
    INPUT_LABEL,
    TEMPLATE_INPUT,
    DISABLED_INPUT,
    TEMPLATE_BUTTON_ADD,
    TEMPLATE_BUTTON_CREATE,
    ADD_TEMPLATE_SECTION,
    FLEX_CONTAINER,
    TEXT_FIELD,
    LINE,
    HOME_PRIMARY_BUTTON,
    INPUT_VALUE_STYLE,
    DIALOG_BUTTON_PURPLE,
    TEMPLATE_TITLE,
};