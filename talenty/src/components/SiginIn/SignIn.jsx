import React, { useState } from "react";
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import AuthInput from "../../shared/AuthInput";
import logo from "./SignPhoto/TalentyLogo.svg";
import TalentyAuth from "./SignPhoto/TalentyAuth2.png";
import { ELECTRICVIOLET } from "../../colors/colors";

const ImgContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${TalentyAuth})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  width: "100%",
}));

const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginBottom: 146,
}));

const H2 = styled("h2")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "25px",
  lineHeight: "25px",
  marginBottom: 20,
}));
const EmailInput = styled(AuthInput)({
  marginTop: 20,
});
const Form = styled("form")({
  marginTop: 20,
});

const Chekbox = styled("input")({
  width: "0px",
  height: "0px",
});

const ChekBoxElement = styled("div")({
  width: 20,
  height: 20,
  backgroundColor: "#fff",
  borderRadius: "50%",
  border: `1px solid #4C494F`,
  "& .cheked": {
    backgroundColor: ELECTRICVIOLET,
  },
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheked, setCheked] = useState(false);

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const ClassName = [];
  const onHandleChangeCheked = (event) => setCheked(event.target.checked);
  console.log(cheked);

  return (
    <>
      <ImgContainer>
        <Container maxWidth="xl" style={{}}>
          <Logo>
            <img src={logo} />
          </Logo>
          <Form>
            <H2>Sign in</H2>
            <AuthInput
              type="text"
              placeholder="Email"
              text="Email"
              value={email}
              onChange={handleChangeEmail}
            />
            <AuthInput
              type="password"
              placeholder="Password"
              text="Password"
              value={password}
              onChange={handleChangePassword}
            />
            <div
              style={{
                display: "flex",
              }}
              className={ClassName}
            >
              <Chekbox
                type="checkbox"
                checked={cheked}
                onChange={onHandleChangeCheked}
              />
              <ChekBoxElement
                className={ClassName}
                onClick={onHandleChangeCheked}
              />
              <span>Remember me</span>
            </div>
          </Form>
        </Container>
      </ImgContainer>
    </>
  );
}

export default SignIn;
