import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Box } from "@mui/system";
import { MAIN_PURPLE, TEXT } from "../../constants/colors";
import {
  POST_SIGN_UP_HR,
  POST_SIGN_UP_JOB_SEEKER,
} from "../../constants/requests";
import {
  StyledContainer,
  H1,
  StyledDiv,
  style,
  StyledBGImage,
  MainStyledSpan,
} from "./signUp";
import { useMemo } from "react";
import { FIELDS, FIELDS_COMPANY } from "./helper";
import SignUpField from "./SignUpField";
import { TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import { SIGN_IN_ROUTE } from "../../constants/routes";

export default function SignUp({ isCompany }) {
  const navigate = useNavigate();
  const [terms, setTerms] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    shouldFocusError: false,
  });
  const fields = useMemo(
    () => (isCompany ? FIELDS_COMPANY(watch) : FIELDS(watch)),
    [isCompany, watch]
  );

  return (
    <StyledContainer>
      <StyledDiv>
        <Dialog
          open={!!dialogInfo}
          maxWidth={false}
          onClose={() => {
            if (dialogInfo.ok) {
              navigate(SIGN_IN_ROUTE);
              setDialogInfo(false);
            } else {
              setDialogInfo(false);
            }
          }}
        >
          <Box
            sx={{
              width: "580px",
              height: "290px",
              paddingBottom: "31px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingTop: "84px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              {dialogInfo?.text?.map((text) => {
                return (
                  <Box
                    key={text}
                    sx={{
                      textAlign: "center",
                      fontSize: "16px",
                      lineHeight: "26px",
                      fontFamily: "Proxima Nova",
                    }}
                  >
                    {text}
                  </Box>
                );
              })}
            </Box>
            <Button
              sx={{ ...TEMPLATE_BUTTON_CREATE, width: "176px" }}
              onClick={() => {
                if (dialogInfo.ok) {
                  navigate(SIGN_IN_ROUTE);
                  setDialogInfo(false);
                } else {
                  setDialogInfo(false);
                }
              }}
            >
              Ok
            </Button>
          </Box>
        </Dialog>
        <FormControl
          onSubmit={handleSubmit((data) => {
            let path = isCompany ? POST_SIGN_UP_HR : POST_SIGN_UP_JOB_SEEKER;
            axios
              .post(path, data)
              .then((res) => {
                setDialogInfo({
                  text: [
                    "Congratulations!!!",
                    "To confirm your registration, please check your email and confirm it within 2 days.",
                  ],
                  ok: true,
                });
              })
              .catch((err) => {
                console.log({ ...err });
                setDialogInfo({
                  text: ["Registration failed.", "Please trye later"],
                  ok: false,
                });
              });
            console.log(data);
          })}
          sx={{
            ...style,
          }}
          required
          autoComplete="off"
          component="form"
        >
          <H1>Create Account</H1>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {fields.map((el) => {
              let { name: value, isPassword, key: objKey, error } = el;
              return (
                <SignUpField
                  {...{ isPassword, register, value, objKey, errors, error }}
                  key={objKey}
                />
              );
            })}
          </Box>

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
          <Button
            type="submit"
            sx={{ ...TEMPLATE_BUTTON_CREATE, width: "466px" }}
            style={{ textDecoration: "none" }}
          >
            Sign up
          </Button>
        </FormControl>
      </StyledDiv>
      <StyledBGImage>
        <img
          src={
            require(`../../assets/icons/signImages/${
              isCompany ? "company" : "user"
            }.webp`).default
          }
          alt="sign up"
        />
      </StyledBGImage>
    </StyledContainer>
  );
}
