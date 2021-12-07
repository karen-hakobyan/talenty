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
import SignUpField from "./SignUpField";
import MuiContainedBtn from "../../shared/MuiContainedBtn";
import Gagarin from "../Assets/SignImages/gagarin.png";
import AlertDialog from "../Dialogs/Alert";

export default function SignUp({ isCompany }) {
  const [alertMsg, setAlertMsg] = useState(false);
  const [terms, setTerms] = useState(false);
  const fieldLabels = useSelector((state) => state.signUp);
  const onSubmit = () => {};

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
              <MainStyledSpan>Terms of use</MainStyledSpan> and
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
        <img src={Gagarin} alt="sign up" />
      </StyledBGImage>
      {!!alertMsg && <AlertDialog info={alertMsg} setOpen={setAlertMsg} />}
    </StyledContainer>
  );
}
