import { useState, useMemo, useEffect } from "react";
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
import { FIELDS, FIELDS_COMPANY } from "./helper";
import SignUpField from "./SignUpField";
import { GLOBAL_TEXT, TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import { SIGN_IN_ROUTE } from "../../constants/routes";
import {
  BOTTOM_ITEMS,
  CHECKBOX_CONTAINER,
  CHECKBOX_STYLE,
  DIALOG_TEXT,
} from "./style";
import { TalentyLogo } from "../../assets/sign";
import { checkNavigation } from "../../helpers/actions";

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
  useEffect(() => {
    checkNavigation(navigate);
  }, [navigate]);

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
          <Box sx={CHECKBOX_CONTAINER}>
            <Box sx={BOTTOM_ITEMS}>
              {dialogInfo?.text?.map((text) => {
                return (
                  <Box key={text} sx={DIALOG_TEXT}>
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
          <Box sx={{ ...BOTTOM_ITEMS, gap: "22px" }}>
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

          <Box sx={CHECKBOX_CONTAINER}>
            <Typography
              variant="body1"
              sx={{
                ...GLOBAL_TEXT,
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
              sx={CHECKBOX_STYLE}
              required={true}
              checked={terms}
              onClick={() => setTerms((prev) => !prev)}
            />
          </Box>
          <Button
            type="submit"
            sx={{
              ...TEMPLATE_BUTTON_CREATE,
              width: "466px",
              ...{ textTransform: "none" },
            }}
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
        <Box
          sx={{
            position: "absolute",
            top: 43,
            right: 60,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <TalentyLogo />
        </Box>
      </StyledBGImage>
    </StyledContainer>
  );
}
