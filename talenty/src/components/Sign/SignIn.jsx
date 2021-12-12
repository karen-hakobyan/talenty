import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";
import logo from "./SignPhoto/TalentyLogo.svg";
import TalentyAuth from "../Assets/SignImages/company.webp";
import "../../fonts/index.css";
import { Link } from "react-router-dom";
import {
  ELECTRICVIOLET,
  TEXT,
  MAIN_PURPLE,
  PLACEHOLDER_GRAY,
  SR_TROPAZ,
} from "../../constants/colors";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "../../constants/routes";
import {
  emailValid,
  passValid,
} from "../../helpers/validation/fieldValidations";
import MuiContainedBtn from "../../shared/MuiContainedBtn";
import axios from "axios";

const ImgContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  backgroundImage: `url(${TalentyAuth})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  backgroundSize: "42%",
  width: "100%",
}));

const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginBottom: 146,
  paddingTop: 46,
  marginRight: 60,
}));

const H2 = styled("h2")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "25px",
  lineHeight: "25px",
  marginBottom: 20,
}));

const Form = styled("form")({
  marginTop: 20,
  maxWidth: 466,
  marginLeft: "154px",
});

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

  justifyContent: "space-between",
});
const ChekboxLable = styled("span")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: TEXT,
  cursor: "pointer",
}));
const ForgotPassword = styled("div")({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "19px",
  color: SR_TROPAZ,
  outline: "none",
});
const ChekConatiner = styled("div")({
  display: "flex",
  justifyContent: "stretch",
  alignItems: "center",
});
const SignUp = styled("div")({
  maxWidth: 466,
  textAlign: "center",
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: TEXT,
  marginTop: 16,
  outline: "none",

  "& span": {
    fontWeight: "600",
    fontSize: "16px",
    lineHeight: "22px",
    marginLeft: 8,
    cursor: "pointer",
    color: ELECTRICVIOLET,
  },
});
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

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheked, setCheked] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const onHandleChangeCheked = () => setCheked(!cheked);
  const onSubmit = () => {
    axios
      .post("http://localhost:7800/login", {
        email,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (!errPassword && !errEmail) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [disabled, errPassword, errEmail]);
  console.log(disabled);
  console.log(errPassword, "pas");

  return (
    <>
      <ImgContainer>
        <Logo>
          <img src={logo} />
        </Logo>

        <Form>
          <H2>Sign in</H2>
          <>
            <H5>Email</H5>
            <CssTextField
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ color: TEXT, paddingTop: 1, maxWidth: "466px" }}
              type="email"
              size="small"
              error={errEmail}
              helperText={errEmail ? "Your email is incorrect" : null}
              onBlur={() =>
                emailValid(email) ? setErrEmail(false) : setErrEmail(true)
              }
            />
          </>
          <>
            <H5>Password</H5>
            <CssTextField
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ color: TEXT, paddingTop: 1, maxWidth: "466px" }}
              type="password"
              size="small"
              error={errPassword}
              helperText={errPassword ? "Your password is incorrect" : null}
              onBlur={() =>
                passValid(password)
                  ? setErrPassword(false)
                  : setErrPassword(true)
              }
            />
          </>
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
            <Link to={FORGOT_PASSWORD_ROUTE}>
              <ForgotPassword>Forgot password?</ForgotPassword>
            </Link>
          </ChekboxContainer>

          <MuiContainedBtn onClick={onSubmit} disabled={disabled}>
            Sign in
          </MuiContainedBtn>

          {/* <AuthButton text="Sign in" /> */}

          <SignUp>
            {"Dont you have an account?"}
            <Link to={SIGN_UP_ROUTE}>
              <span>{"Sign up"}</span>
            </Link>
          </SignUp>
        </Form>
      </ImgContainer>
    </>
  );
}

export default SignIn;
