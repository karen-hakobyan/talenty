import { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, FormControl, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
import axios from "axios";
export default function SignUp({ isCompany, img }) {
  const [alertMsg, setAlertMsg] = useState(false);
  const [terms, setTerms] = useState(false);
  const fieldLabels = useSelector((state) => state.signUp);
  const onSubmit = () => {
    const data = fieldLabels.reduce((accum, item) => {
      accum[item.inputName] = item.value;
      return accum;
    }, {});
    console.log(data);
    axios
      .post("http://localhost:7800/register/hr", {
        ...data,
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(new Error(err));
      });
  };

  return (
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
        <img src={img} alt="sign up" />
      </StyledBGImage>
      {!!alertMsg && <AlertDialog info={alertMsg} setOpen={setAlertMsg} />}
    </StyledContainer>
  );
}
