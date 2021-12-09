import React from "react";
import { styled } from "@mui/system";
import { ELECTRICVIOLET, MAGNET, PLACEHOLDER_GRAY } from "../colors/colors";

const Container = styled("div")({
  marginTop: 20,
});

const H5 = styled("h5")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: MAGNET,
  marginLeft: 3,
  marginBottom: 10,
}));

const Input = styled("input")(({ theme }) => ({
  background: "#FFFFFF",
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: PLACEHOLDER_GRAY,
  paddingLeft: 8,
  paddingRight: 8,
  border: "1px solid #D9D9D9",
  borderRadius: "4px",
  height: "40px",
  outlineColor: ELECTRICVIOLET,
  transition: "all 0.4s",
}));

function AuthInput(props) {
  const onChange = props.onChange;
  const width = props.width;
  const text = props.text;
  const placeholder = props.placeholder;
  const type = props.type;
  const value = props.value;

  return (
    <>
      <Container>
        <H5>{text}</H5>
        <Input
          style={{
            maxWidth: !width ? "466px" : width,
            width: "100%",
          }}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
      </Container>
    </>
  );
}

export default AuthInput;
