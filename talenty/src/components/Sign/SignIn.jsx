import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Container } from "@mui/material";
import AuthInput from "../../shared/AuthInput";
import logo from "./SignPhoto/TalentyLogo.svg";
import TalentyAuth from "./SignPhoto/talenty.png";
import AuthButton from "../../shared/AuthButton";
import "../../fonts/index.css";
import { ELECTRICVIOLET, MAGNET, SR_TROPAZ } from "../../constants/colors";
import Auth from "../../shared/Auth";

const ImgContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${TalentyAuth})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  backgroundSize: "auto",
  width: "100%",
}));

const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginBottom: 146,
  paddingTop: 46,
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

// const Chekbox = styled("input")({
//   width: "0px",
//   height: "0px",
// });

const Chekbox = styled("div")({
  width: 20,
  height: 20,
  backgroundColor: "#fff",
  borderRadius: "50%",
  border: `1px solid #4C494F`,
  position: "relative",
  outline: "none",
  marginRight: 8,
  cursor: "pointer",
});

const ChekboxActive = styled("div")({
  borderRadius: "50%",
  backgroundColor: ELECTRICVIOLET,
  width: 14,
  height: 14,

  position: "absolute",
  top: "50%",
  right: "-29%",

  transform: "translate(-50%, -50%)",
});

const ChekboxContainer = styled("div")({
  display: "flex",
  marginTop: 20,
  justifyContent: "space-between",
});
const ChekboxLable = styled("span")(({ theme }) => ({
  fontFamily: "ProximaNova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: MAGNET,
  cursor: "pointer",
}));
const ForgotPassword = styled("div")({
  fontFamily: "ProximaNova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "19px",
  color: SR_TROPAZ,
});
const ChekConatiner = styled("div")({
  display: "flex",
  justifyContent: "stretch",
  alignItems: "center",
});
const SignUp = styled("div")({
  textAlign: "center",
  fontFamily: "ProximaNova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: MAGNET,

  "& span": {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    marginLeft: 8,
    cursor: "pointer",
    color: ELECTRICVIOLET,
  },
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheked, setCheked] = useState(true);

  const handleChangeEmail = (event) => setEmail(event.target.value);
  const handleChangePassword = (event) => setPassword(event.target.value);
  const onHandleChangeCheked = () => setCheked(!cheked);
  const signIN = [
    {
      value: email,
      validetion: true,
      name: "Email",
      validetion: true,
      errorText: "Your email is incorrect",

      onChange: setEmail,
    },
    // {
    //   value: password,
    //   validetion: false,
    //   name: "Password",
    //   onChange: setPassword,
    // },
  ];
  return (
    <>
      <ImgContainer>
        <Container maxWidth="xl" style={{}}>
          <Logo>
            <img src={logo} />
          </Logo>
          <div
            style={{
              maxWidth: 466,
            }}
          >
            <Form>
              <H2>Sign in</H2>
              <div>
                {signIN.map((item) => (
                  <Auth label={item} key={item.name} />
                ))}
              </div>
              <AuthInput
                placeholder="Email"
                text="Email"
                validetion={true}
                value={email}
                errorText="Your email is incorrect"
                onChange={handleChangeEmail}
              />
              {/* <AuthInput
                placeholder="Password"
                text="Password"
                value={password}
                onChange={handleChangePassword}
              /> */}

              <ChekboxContainer
                style={{
                  display: "flex",
                }}
              >
                <ChekConatiner>
                  <Chekbox
                    onClick={onHandleChangeCheked}
                    style={{
                      border: cheked ? `1px solid #8C0DF0` : null,
                    }}
                  >
                    {cheked ? <ChekboxActive /> : null}
                  </Chekbox>
                  <ChekboxLable onClick={onHandleChangeCheked}>
                    Remember me
                  </ChekboxLable>
                </ChekConatiner>
                <ForgotPassword>Forgot password?</ForgotPassword>
              </ChekboxContainer>

              <AuthButton text="Sign in" />
              <SignUp>
                Dont you have an account?<span>Sign up</span>
              </SignUp>
            </Form>
          </div>
        </Container>
      </ImgContainer>
    </>
  );
}

export default SignIn;
