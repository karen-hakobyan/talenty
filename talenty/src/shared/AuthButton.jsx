import React from "react";
import { styled } from "@mui/system";
import "../fonts/index.css";
import { ELECTRICVIOLET, FRENCH_VIOLET, WHITE } from "../constants/colors";

const Button = styled("div")(({ theme }) => ({
  height: "40px",
  background: ELECTRICVIOLET,
  borderRadius: "4px",
  marginTop: 26,
  transition: "all 0.4s",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: FRENCH_VIOLET,
    transition: "all 0.4s",
  },
}));
const Text = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "22px",
  color: WHITE,
}));

function AuthButton(props) {
  const onClick = props.onClick;
  const width = props.width;
  const text = props.text;
  return (
    <>
      <Button
        onClick={onClick}
        style={{
          maxWidth: !width ? "466px" : width,
        }}
      >
        <Text>{text}</Text>
      </Button>
    </>
  );
}

export default AuthButton;
