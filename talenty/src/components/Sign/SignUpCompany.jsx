import { useState, useRef } from "react";
import { FormControl, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import SignUpField from "./SignUpField";
import { HEADER_TEXT, MAIN_PURPLE, TEXT } from "../../constants/colors";
import MuiContainedBtn from "../../shared/MuiContainedBtn";
import Alert from "../Dialogs/Alert";
import {
  companyNameValid,
  nameValid,
  emailValid,
  passValid,
} from "../../helpers/validation/fieldValidations";
import axios from "axios";

const StyledContainer = styled(Box)({
  p: 0,
  m: 0,
  display: "flex",
});
const H1 = styled("h1")({
  fontWeight: 600,
  fontSize: 25,
  letterSpacing: "0.04em",
  color: HEADER_TEXT,
  marginTop: 24,
  marginBottom: 10,
  fontFamily: "Proxima Nova",
});
const StyledDiv = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "left",
  width: "100%",
  mardinTop: 10,
  fontFamily: "Proxima Nova",
  p: {
    fontFamily: "Proxima Nova",
  },
});
const StyledSpan = styled("span")({
  color: MAIN_PURPLE,
  cursor: "pointer",
});
const style = {
  width: "34.11420204978038vw",
  innerHeight: "auto",
  display: "flex",
  flexDirection: "column",
  pt: "2%",
  pl: "6%",
  marginBottom: 5,
};
const StyledBGImage = styled("div")({
  img: {
    height: "100%",
    widht: "auto",
    minHeight: "23.75rem",
    maxWidth: "40rem",
  },
});

function SignUp({ bgImg, data }) {
  const [company, setCompany] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const validFields = useRef([]);
  const fieldLabels = [
    {
      name: "Company name",
      value: company,
      onChange: setCompany,
      valid: companyNameValid,
    },
    {
      name: "First name",
      value: firstName,
      onChange: setFirstName,
      valid: nameValid,
    },
    {
      name: "Last name",
      value: lastName,
      onChange: setLastName,
      valid: nameValid,
    },
    {
      name: "Email",
      value: email,
      onChange: setEmail,
      valid: emailValid,
    },
    {
      name: "Password",
      value: password,
      onChange: setPassword,
      valid: passValid,
    },
    {
      name: "Confirm password",
      value: confirmPassword,
      onChange: setConfirmPassword,
      valid: passValid,
    },
  ];
  const onSubmit = (e) => {
    e.preventDefault();
    if (!terms) {
      setAlertMsg("Please accept terms of use & Privacy");
      return;
    }
    if (!confirmPassword && !password) {
      setAlertMsg("Please fill both password fields");
      return;
    }
    if (confirmPassword !== password) {
      setAlertMsg("Passwords didn't match");
      return;
    }
    if (!companyNameValid(company)) {
      setAlertMsg("Company name is incorrect");
      return;
    }
    if (!nameValid(firstName) || !nameValid(lastName)) {
      setAlertMsg("Name or Surname is incorrect");
      return;
    }
    if (!emailValid(email)) {
      setAlertMsg("Your email is incorrect");
      return;
    }
    // here would be check if exists in db
    axios
      .post("/user", {
        firstName,
        lastName,
        email,
        password,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <StyledContainer>
        <StyledDiv>
          <FormControl
            sx={{
              ...style,
            }}
            required={true}
            autoComplete="off"
            component="form"
            onSubmit={onSubmit}
          >
            <H1>Create Account</H1>
            {fieldLabels.map((label, index) => (
              <SignUpField
                key={label + index}
                label={label}
                validFields={validFields}
              />
            ))}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                span: { p: 0 },
                mb: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: 14,
                  color: TEXT,
                  mt: 3,
                  width: "100%",
                }}
              >
                By creating an account, I agree to Talenty’s{" "}
                <StyledSpan>Terms of use</StyledSpan> and <br />
                <StyledSpan>Privacy policy</StyledSpan> and to receive emails
              </Typography>
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": { fontSize: 28, color: MAIN_PURPLE },
                }}
                required={true}
                checked={terms}
                onClick={() => setTerms((prev) => !prev)}
              />
            </Box>
            <MuiContainedBtn onClick={onSubmit} bgColor={MAIN_PURPLE}>
              Sign up
            </MuiContainedBtn>
          </FormControl>
        </StyledDiv>
        <StyledBGImage>
          <img src={bgImg} alt="sign up" />
        </StyledBGImage>
        {!!alertMsg && <Alert info={alertMsg} setOpen={setAlertMsg} />}
      </StyledContainer>
    </>
  );
}

export default SignUp;
