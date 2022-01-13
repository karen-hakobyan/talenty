import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { TextField, Typography } from "@mui/material";
// import logo from "./SignPhoto/TalentyLogo.svg";
import { TalentyLogo } from "../../assets/sign";
import TalentyAuth from "../Assets/SignImages/user.webp";
import "../../fonts//index.css";
import {
  MAIN_PURPLE,
  NIGHT_RIDER,
  PLACEHOLDER_GRAY,
  TEXT,
} from "../../constants/colors";
import { emailValid } from "../../helpers/validation/fieldValidations";
import MuiContainedBtn from "../../shared/MuiContainedBtn";
import AlertMessage from "./AlertMessage";
import axios from "axios";
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
const Title = styled(Typography)(({ theme }) => ({
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

const Tetx = styled(Typography)(({ theme }) => ({
  width: "100%",
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "22px",
  color: TEXT,
}));
const H5 = styled("h5")(({ theme }) => ({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: "16px",
  lineHeight: "24px",
  color: TEXT,
  marginLeft: 3,
  marginBottom: 5,
  marginTop: 36,
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
const ContentContainer = styled("div")(({ tehem }) => ({
  maxWidth: 466,
  marginLeft: "154px",
}));

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  //TODO change this url
  const onSubmit = () => {
    axios
      .get(`http://localhost:7800/reset/password?email=${email}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!errEmail) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [disabled, errEmail]);

  return (
    <>
      <ImgContainer>
        <Logo>
          <TalentyLogo />
        </Logo>

        <ContentContainer>
          <Title variant="h1" component="div">
            Forgot password?
          </Title>
          <Tetx
            variant="subtitle1"
            component="div"
            sx={{
              fontFamily: "Proxima Nova",
              fontStyle: "normal",
              fontWeight: "normal",
            }}
          >
            Enter your email address below and we’ll send an
            <br /> email with a link to update your password.
          </Tetx>

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
              emailValid(email) ? setErrEmail() : setErrEmail(true)
            }
          />
          <MuiContainedBtn disabled={false} onClick={onSubmit}>
            Submit
          </MuiContainedBtn>
          {open && <AlertMessage handleClose={setOpen} open={open} />}
        </ContentContainer>
      </ImgContainer>
    </>
  );
}

export default ForgotPassword;
