import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Checkbox, FormControl, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { MAIN_PURPLE, TEXT } from "../../constants/colors";
import {
  StyledContainer,
  H1,
  StyledDiv,
  style,
  StyledBGImage,
  MainStyledSpan,
} from "./signUp";
import {
  companyNameValid,
  nameValid,
  emailValid,
  passValid,
} from "../../helpers/validation/fieldValidations";
import SignUpField from "./SignUpField";
import MuiContainedBtn from "../../shared/MuiContainedBtn";
import AlertDialog from "../Dialogs/Alert";
import { POST_SIGN_UP } from "../../constants/requests";

export default function SignUp({ isCompany }) {
  const [alertMsg, setAlertMsg] = useState(false);
  const [terms, setTerms] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let { pathname } = useLocation();
  pathname = pathname.split("-").slice(-1)[0];
  const fieldLabels = [
    {
      name: "Company name",
      value: companyName,
      inputName: "companyName",
      onChange: setCompanyName,
    },
    {
      name: "First name",
      value: firstName,
      inputName: "firstName",
      onChange: setFirstName,
    },
    {
      name: "Last name",
      value: lastName,
      inputName: "lastName",
      onChange: setLastName,
    },
    {
      name: "Email",
      value: email,
      inputName: "email",
      onChange: setEmail,
    },
    {
      name: "Password",
      value: password,
      inputName: "password",
      onChange: setPassword,
      isPass: true,
    },
    {
      name: "Confirm password",
      value: confirmPassword,
      inputName: "confirmPassword",
      onChange: setConfirmPassword,
      isPass: true,
    },
  ];
  const onSubmit = () => {
    const data = fieldLabels.reduce((accum, item) => {
      accum[item.inputName] = item.value;
      return accum;
    }, {});
    if (pathname === "user") {
      delete data.companyName;
    }

    if (!terms) {
      setAlertMsg("Check the Terms & Privacy policy");
    } else if (isCompany && !companyNameValid(companyName)) {
      setAlertMsg("Incorrect company name type");
    } else if (!nameValid(firstName) || !nameValid(lastName)) {
      setAlertMsg("Incorrect name or surname type");
    } else if (!emailValid(email)) {
      setAlertMsg("Incorrect email type");
    } else if (!password || password !== confirmPassword) {
      setAlertMsg("Passwords didn't mutch");
    } else if (!passValid(password)) {
      setAlertMsg({
        part1: "Your password is weak!!! Should has",
        part2: "8 characters, 1 uppercase, 1 special character, 1 number",
      });
    } else {
      axios
        .post(POST_SIGN_UP, {
          ...data,
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          console.log(new Error(err));
          setAlertMsg("Something went wrong please try after few minutes");
        });
    }
  };

  return (
    <StyledContainer>
      <StyledDiv>
        <FormControl
          sx={{
            ...style,
          }}
          required
          autoComplete="off"
          component="form"
          onSubmit={onSubmit}
        >
          <H1>Create Account</H1>
          {!isCompany
            ? fieldLabels
                .filter((item) => item.inputName !== "companyName")
                .map((label, index) => (
                  <SignUpField key={label + index} label={label} />
                ))
            : fieldLabels.map((label, index) => (
                <SignUpField key={label + index} label={label} />
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
              <MainStyledSpan>Terms of use</MainStyledSpan> and{" "}
              <MainStyledSpan>Privacy policy</MainStyledSpan> and to receive
              emails
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
        <img
          src={
            require(`../Assets/SignImages/${
              pathname === "user" ? "user" : "company"
            }.webp`).default
          }
          alt="sign up"
        />
      </StyledBGImage>
      {!!alertMsg && <AlertDialog info={alertMsg} setOpen={setAlertMsg} />}
    </StyledContainer>
  );
}
