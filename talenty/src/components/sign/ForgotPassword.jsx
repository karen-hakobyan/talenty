import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, styled } from "@mui/system";
import { TextField, Typography } from "@mui/material";
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
import BackgroundImage from "./BackgroundImage";
import { useForm } from "react-hook-form";

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

const Text = styled(Typography)(({ theme }) => ({
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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
      <BackgroundImage>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ContentContainer>
            <Title variant="h1" component="div">
              Forgot password?
            </Title>
            <Text
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
            </Text>

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
        </Box>
      </BackgroundImage>
    </>
  );
}

export default ForgotPassword;
