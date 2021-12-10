import React from "react";
import { Box, styled } from "@mui/system";
import { Container, TextField } from "@mui/material";
import logo from "./SignPhoto/TalentyLogo.svg";
import TalentyAuth from "./SignPhoto/talenty.png";
import AuthButton from "../../shared/AuthButton";
import "../../fonts/index.css";
const StyledBGImage = styled("div")({
  img: {
    height: "100%",
    widht: "auto",
    minHeight: "23.75rem",
    maxWidth: "30rem",
  },
});
const StyledContainer = styled(Box)({
  p: 0,
  m: 0,
  display: "flex",
});

export default function SignIn2() {
  return (
    <>
      <StyledContainer>
        <StyledBGImage>
          <img src={TalentyAuth} />
        </StyledBGImage>
      </StyledContainer>
    </>
  );
}
