import React, { useState } from "react";
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import AuthInput from "../../shared/AuthInput";
import AuthButton from "../../shared/AuthButton";
import logo from "./SignPhoto/TalentyLogo.svg";
import TalentyAuth from "./SignPhoto/talenty1.png";

import "../../fonts//index.css";
import { MAGNET, NIGHT_RIDER } from "../../constants/colors";
const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginBottom: 146,
  paddingTop: 46,
}));
const ImgContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${TalentyAuth})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  width: "100%",
  backgroundSize: "auto",
}));
const Title = styled("h3")(({ theme }) => ({
  maxWidth: 317,
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 25,
  lineHeight: "25px",
  letterSpacing: "0.04em",
  marginBottom: 18,
  color: NIGHT_RIDER,
}));

const Tetx = styled("p")(({ theme }) => ({
  maxWidth: 319,
  width: "100%",
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "22px",
  color: MAGNET,
}));

function ForgotPassword() {
  const [changePassword, setchangePassword] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangeEmail = (event) => setemail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const handleChangesetConfirmPassword = (event) =>
    setConfirmPassword(event.target.value);
  const onChangePassword = () => setchangePassword(!changePassword);

  return (
    <>
      <Container maxWidth="xl">
        <ImgContainer>
          <Logo>
            <img src={logo} />
          </Logo>
          {changePassword ? (
            <>
              <Title>Forgot password?</Title>
              <Tetx>
                Enter your email address below and we’ll send an email with a
                link to update your password.
              </Tetx>
              <AuthInput
                type="text"
                placeholder="Talenty@talenty.com"
                text="Email"
                value={email}
                onChange={handleChangeEmail}
              />
              <AuthButton text="Submit" onClick={onChangePassword} />
            </>
          ) : (
            <>
              <Title>Please enter a new password for your account.</Title>

              <AuthInput
                type="password"
                placeholder="Enter new password"
                text="Password"
                validetion={true}
                value={password}
                onChange={handleChangePassword}
              />
              <AuthInput
                type="password"
                placeholder="Talenty@talenty.com"
                text="Confirm password"
                validetion={password}
                value={confirmPassword}
                onChange={handleChangesetConfirmPassword}
              />
              <AuthButton text="Submit" onClick={onChangePassword} />
            </>
          )}
        </ImgContainer>
      </Container>
    </>
  );
}

export default ForgotPassword;
