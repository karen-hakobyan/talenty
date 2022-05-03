import {MAIN_PURPLE} from "../../style/colors";

export const FLEX_CONTAINER = {
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
    fontSize: "15px",
    lineHeight: "26px",
    fontFamily: "'Poppins', sans-serif",
};
export const CHECKBOX_CONTAINER = {
    display: "flex",
    alignItems: "center",
    span: {p: 0},
    mb: 2,
};
export const CHECKBOX_STYLE = {
    "& .MuiSvgIcon-root": {fontSize: 28, color: MAIN_PURPLE},
};

export const butonStyleGenerator = (isCompany, isCompanyState) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: "100%",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    cursor: "pointer",
    borderRadius: "4px",
    background: isCompanyState ?
        isCompany ?
            MAIN_PURPLE :
            "transparent" :
        !isCompany ?
            MAIN_PURPLE :
            "transparent",
    color: isCompanyState ?
        isCompany ?
            "#FFF" :
            MAIN_PURPLE :
        !isCompany ?
            "#FFF" :
            MAIN_PURPLE,
    transition: "all, 0.5s",
    "&:hover": {
        background: isCompanyState ?
            isCompany ?
                "#7204c9" :
                "transparent" :
            !isCompany ?
                "#7204c9" :
                "transparent",
        transition: "all, 0.5s",
    },
});
export const BUTON_STYLE = {
    display: "flex",
    justifyContent: "space-between",
    width: "466px",
    height: "40px",
    border: `1px solid ${MAIN_PURPLE}`,
    borderRadius: "4px",
};