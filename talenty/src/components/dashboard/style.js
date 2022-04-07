import {WIDTH_TRANSITION} from "./helper";

export const CONTAINER_HEADER = {
    height: "80px",
    display: "flex",
    pt: "20px",
    pb: "20px",
    pl: "26px",
    pr: "26px",
    boxShadow: "0px 2px 8px 0px #2D2D2D0F",
    alignItems: "center",
    justifyContent: 'space-between'
};

// navigation
export const MAIN_NAV_CONTAINER = (isNavOpen, maxWidth, minWidth) => ({
    width: isNavOpen ? `${maxWidth}px` : `${minWidth}px`,
    background: "#FFFFFF",
    position: "relative",
    transition: `width ${WIDTH_TRANSITION}s`,
    boxShadow: "2px 6px 8px 0px #2D2D2D0F",
    maxHeight: 'calc(100vh - 80px)',
});

export const MAIN_OPENER = (isNavOpen) => ({
    position: "absolute",
    cursor: "pointer",
    right: "-14px",
    ...(!isNavOpen ? {transform: "rotate(180deg)"} : {}),
});

export const NAV_GENERATOR_CONTAINER = {
    pt: "48px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
    pl: "22px",
    height: 'calc(100vh - 80px)',
    overflow: 'scroll'
};

export const NAV_ITEM_CONTAINER = {
    display: "flex",
    justifyContent: "space-between",
    pr: "28px",
};

export const ICON_TEXT_CONTAINER = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
};

export const MAIN_TEXT_STYLE = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
    fontSize: "16px",
    lineHeight: "19px",
    color: "#5D00A6",
};

export const ITEM_CHILDREN_CONTAINER = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    mt: "16px",
    ml: "53px",
};

export const CHILD_TEXT = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "17px",
    letterSpacing: "0em",
    color: "#2A2D3FB5",
};

export const CHILD_ICON_TEXT_CONTAINER = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    cursor: 'pointer'
};
