const TEMPLATE_ITEM_BUTTON = {
    display: "flex",
    gap: 1,
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: "400px",
    width: "94px",
    height: "34px",
    borderRadius: "6px",
    color: "#616162",
    border: "1px solid #ECECEC",
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
    fontSize: "16px",
    marginBottom: "10px",
};

const FIELD_CHECKBOX_CONTAINER = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
};
const TEMPLATE_INPUT = { width: "421px" };
const DISABLED_INPUT = { background: "#F5F5F5" };
export {
    TEMPLATE_ITEM_BUTTON,
    TEMPLATE_ITEM_BUTTON_DISABLED,
    INPUT_LABEL,
    FIELD_CHECKBOX_CONTAINER,
    TEMPLATE_INPUT,
    DISABLED_INPUT,
};