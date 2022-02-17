export const CONTAINER_HEADER = {
  height: "74px",
  display: "flex",
  pt: "20px",
  pb: "20px",
  pl: "26px",
  pr: "26px",
  boxShadow: "0px 2px 8px 0px #2D2D2D0F",
  alignItems: "center",
};

export const BOX_STYLE_SHADOW = {
  background: "#FFFFFF",
  boxShadow: "0px 0px 16px 0px #2F2F2F1A",
};

export const MAIN_BOX_STYLE = {
  ...BOX_STYLE_SHADOW,
  width: "427px",
  height: "494px",
  borderRadius: "2px",
  pl: "24px",
  pr: "24px",
};

export const SWITCH_TITLE = {
  fontFamily: "Proxima Nova",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "19px",
  letterSpacing: "0em",
};
export const SWITCH = {
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      color: "#ffffff",
      "& + .MuiSwitch-track": {
        background: "#8C0DF0",
        opacity: 1,
      },
    },
  },
};
