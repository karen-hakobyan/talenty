import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Dialog,
  FormControl,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import BackgroundImage from "./BackgroundImage";
import {
  POST_SIGN_UP_HR,
  POST_SIGN_UP_JOB_SEEKER,
} from "../../constants/requests";
import { StyledContainer, StyledDiv, style, MainStyledSpan } from "./signUp";
import { changeButtonInformation, FIELDS, FIELDS_COMPANY } from "./helper";
import SignUpField from "./SignUpField";
import { GLOBAL_TEXT, TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import { SIGN_IN_ROUTE } from "../../constants/routes";
import {
  BOTTOM_ITEMS,
  butonStyleGenerator,
  BUTON_STYLE,
  CHECKBOX_CONTAINER,
  CHECKBOX_STYLE,
  DIALOG_TEXT,
  FLEX_CONTAINER,
} from "./style";
import { checkNavigation } from "../../helpers/actions";

export default function SignUp() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState(false);
  const [dialogInfo, setDialogInfo] = useState(false);
  const [isCompany, setIsCompany] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
    <Box>
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
          <Box sx={FLEX_CONTAINER}>
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
              style={{textTransform: "none",}}
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
        <BackgroundImage img={isCompany}>
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
            })}
            sx={style}
            required
            autoComplete="off"
            component="form"
          >
            <Box sx={{ ...BOTTOM_ITEMS, gap: "22px" }}>
              <Box sx={BUTON_STYLE}>
                {changeButtonInformation.map(({ text, isCompanyState }) => (
                  <Box
                    key={text}
                    sx={butonStyleGenerator(isCompany, isCompanyState)}
                    onClick={() => {
                      setIsCompany(isCompanyState ? true : false)
                      reset()
                    }}
                  >
                    {text}
                  </Box>
                ))}
              </Box>
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
              <Box sx={{
                display:"flex",
                gap:"53px"
                }}>
                  <Box sx={{width:385}}>
              <Typography
                variant="body1"
                sx={{
                  ...GLOBAL_TEXT,
                  mt: 3,
                }}
              >
                By creating an account, I agree to Talenty’s{" "}
                <MainStyledSpan>Terms of use</MainStyledSpan> and{" "}
                <MainStyledSpan>Privacy policy</MainStyledSpan> and to receive
                emails
              </Typography>
              </Box>
              
              <Checkbox
                sx={CHECKBOX_STYLE}
                required={true}
                checked={terms}
                onClick={() => setTerms((prev) => !prev)}
              />
              
              </Box>
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
        </BackgroundImage>
        </Box>
    
  );
}
