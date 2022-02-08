import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";
import logo from "./SignPhoto/TalentyLogo.svg";
import TalentyAuth from "../Assets/SignImages/user.webp";

import "../../fonts//index.css";
import {
  MAIN_PURPLE,
  NIGHT_RIDER,
  PLACEHOLDER_GRAY,
  TEXT,
} from "../../constants/colors";
import MuiContainedBtn from "../../shared/MuiContainedBtn";
const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginBottom: 146,
  paddingTop: 46,
  marginRight: 60,
}));
const ImgContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${TalentyAuth})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  backgroundSize: "42%",
}));
const Title = styled("h3")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 25,
  lineHeight: "25px",
  letterSpacing: "0.04em",
  marginBottom: 18,
  color: NIGHT_RIDER,
}));

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: MAIN_PURPLE,
      paddingBottom: 1,
    },
  },
  "&::placeholder": {
    color: PLACEHOLDER_GRAY,
  },
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  color: TEXT,
  paddingTop: 1,
  width: "100%",
  marginBottom: 20,
});
const H5 = styled("h5")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: TEXT,
  marginLeft: 3,
  marginBottom: 5,
}));
const ContentContainer = styled("div")(({ tehem }) => ({
  maxWidth: 466,
  marginLeft: "154px",
}));
function ConfirmPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errPassword, setErrPassword] = useState(false);
  const [errConfirmPassword, setErrConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (!errPassword && !errConfirmPassword) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [disabled, errPassword, errConfirmPassword]);

  //   console.log(errConfirmPassword, "con");

  return (
    <ImgContainer>
      <Logo>
        <img src={logo} alt="logo" />
      </Logo>
      <ContentContainer>
        <Title>
          Please enter a new
          <br /> password for your account.
        </Title>

        <H5>Password</H5>
        <CssTextField
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ color: TEXT, paddingTop: 1, maxWidth: "466px" }}
          type="password"
          size="small"
          // error={errPassword}
          // helperText={errPassword ? "Your password is incorrect" : null}
          // onBlur={() =>
          //   passValid(password) ? setErrPassword(true) : setErrPassword(false)
          // }
        />

        <H5>Confirm password</H5>
        <CssTextField
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ color: TEXT, paddingTop: 1, maxWidth: "466px" }}
          type="password"
          size="small"
        />
        <MuiContainedBtn>Submit</MuiContainedBtn>
      </ContentContainer>
    </ImgContainer>
  );
}

export default ConfirmPassword;