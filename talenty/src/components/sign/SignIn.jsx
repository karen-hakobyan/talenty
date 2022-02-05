import { useForm } from "react-hook-form";
import axios from "axios";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { TalentyLogo } from "../../assets/sign";
import "../../fonts/index.css";
import { Box, Button, Checkbox, Dialog, FormControl } from "@mui/material";
import { FIELD } from "./signInHelper";
import SignInField from "./SignInField";
import { TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import { useState } from "react";
import { FORGOT_PASSWORD_ROUTE } from "../../constants/routes";
import { LOGIN } from "../../constants/requests";
import { useDispatch } from "react-redux";
import { setDialogIsOpen, setDialogType } from "../../store/dialogs/slice";
import { MAIN_PURPLE } from "../../constants/colors";
import BackgroundImage from "./BackgroundImage";



const Logo = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  marginBottom: 146,
  paddingTop: 46,
  marginRight: 60,
}));

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldFocusError: false,
  });
  const [dialogInfo, setDialogInfo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Dialog
        maxWidth={false}
        open={!!dialogInfo?.open}
        onClose={() => setDialogInfo(false)}
      >
        {dialogInfo?.text}
      </Dialog>
      <BackgroundImage>
      <Logo>
          <TalentyLogo />
        </Logo>
        <Box sx={{ paddingLeft: "154px" }}>
          <Box
            sx={{
              fontFamily: "Proxima Nova",
              fontSize: "25px",
              fontWeight: 600,
              lineHeight: "25px",
              letterSpacing: "0.04em",
              color: "#2F2F2F",
            }}
          >
            Sign in
          </Box>
          <FormControl>
            <Box
              sx={{
                pt: "42px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {FIELD.map(({ objKey, label, isPassword, error }) => {
                return (
                  <SignInField
                    key={objKey}
                    {...{ objKey, label, isPassword, register, errors, error }}
                  />
                );
              })}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                  <Checkbox
                    checked={isChecked}
                    onChange={() => setIsChecked((prev) => !prev)}
                    sx={{ borderRadius: "50%" }}
                    icon={
                      <Box
                        sx={{
                          border: "2px solid black",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                        }}
                      />
                    }
                    checkedIcon={
                      <Box
                        sx={{
                          height: "22px",
                          width: "22px",
                          textAlign: "center",
                          color: "white",
                          borderRadius: "50%",
                          border: `2px solid ${MAIN_PURPLE}`,
                          background: `radial-gradient(circle at center, ${MAIN_PURPLE} 55%, transparent 0%)`,
                        }}
                      />
                    }
                  />
                  <Box
                    sx={{
                      fontFamily: "Proxima Nova",
                      fontSize: "16px",
                      fontWeight: 400,
                      lineHeight: "24px",
                      letterSpacing: "0em",
                      color: "#4C494F",
                    }}
                  >
                    Remember me
                  </Box>
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    color: "#2C5282",
                    fontFamily: "Proxima Nova",
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "19px",
                    letterSpacing: "0em",
                  }}
                  onClick={() => navigate(FORGOT_PASSWORD_ROUTE)}
                >
                  Forgot password?
                </Box>
              </Box>
              <Button
                onClick={handleSubmit((data) => {
                  axios
                    .post(LOGIN, data)
                    .then((response) => {
                      setDialogInfo({ open: true, text: "Welcome" });
                      console.log(response);
                    })
                    .catch((err) => {
                      console.log({ ...err });
                      setDialogInfo({
                        open: true,
                        text: "Please, check your email or password once again. The email or password is incorrect.",
                      });
                    });
                })}
                sx={{ ...TEMPLATE_BUTTON_CREATE, width: "466px" }}
                style={{ textTransform: "none" }}
              >
                Sign in
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                  color: "#4C494F",
                  fontFamily: "Proxima Nova",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "21px",
                  letterSpacing: "0.02em",
                }}
              >
                Dont you have an account?
                <Box
                  onClick={() => {
                    dispatch(setDialogIsOpen(true));
                    dispatch(setDialogType("setIsCompany"));
                  }}
                  sx={{
                    cursor: "pointer",
                    color: "#8C0DF0",
                    fontFamily: "Proxima Nova",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "22px",
                  }}
                >
                  Sign up
                </Box>
              </Box>
            </Box>
          </FormControl>
        </Box>
      </BackgroundImage>
      
    </>
  );
}

export default SignIn;
