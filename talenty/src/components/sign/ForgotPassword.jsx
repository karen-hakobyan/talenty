import React, { useState, useMemo} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { Box, styled } from "@mui/system";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Dialog, FormControl, Typography } from "@mui/material";
import "../../fonts//index.css";
import {
  MAIN_PURPLE,
  NIGHT_RIDER,
  TEXT,
} from "../../constants/colors";
import BackgroundImage from "./BackgroundImage";
import { useForm } from "react-hook-form";
import { FIELD_EMAIL, FIELD_RESET_PASSWORD } from "./helper";
import SignUpField from "./SignUpField";
import {  TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import { getForgotPassword } from "../../constants/requests";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../constants/routes";
import { DIALOG_TEXT, FLEX_CONTAINER } from "./style";
import ResetPassword from "../../store/auth/ResetPassword";
import { selectAuthModalInfo } from "../../store/auth/selector";
import { setAuthModalInfo } from "../../store/auth/authSlice";

const Title = styled(Typography)(({ theme }) => ({
  maxWidth: 317,
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: 25,
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


const ContentContainer = styled("div")(({ tehem }) => ({
  maxWidth: 466,
  marginLeft: "154px",
}));

const dialogMesseng ="Try again "



function ForgotPassword() {
  const {search} = useLocation()
  const dispatch = useDispatch()
  const modalInfo = useSelector(selectAuthModalInfo)
  const token = useMemo(() => search && search.split('=')[1], [search])
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    shouldFocusError: false,
  });
  const navigate = useNavigate()
  console.log(modalInfo)

  return (
    <>
    <Box>
      <Dialog
        open={!!modalInfo}
        onClose={()=>dispatch(setAuthModalInfo(null))}
        maxWidth={false}>
          <Box sx={FLEX_CONTAINER}>
              <Box sx={{...DIALOG_TEXT,color:"#000"}}>{modalInfo}</Box>
              <Button sx={{
                ...TEMPLATE_BUTTON_CREATE, width: "176px" 
              }}
              onClick={()=>dispatch(setAuthModalInfo(null))}
              >
                Ok
              </Button>
            </Box>
        </Dialog>
    
      <BackgroundImage>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          <ContentContainer>
            {token ?
             <Box>
               <Title>
                 Please enter a new password for your account.
               </Title>
                <FormControl 
              sx={{mt:"36px"}}
              >
               <Box sx={{
                 display:"flex",
                 flexDirection:"column",
                 gap:"20px"
               }}>
                 {FIELD_RESET_PASSWORD(watch).map((el) => {
                   let { name: value, isPassword, key: objKey, error } = el;
                   return (
                      <SignUpField
                         {...{ isPassword, register, value, objKey, errors, error }}
                         key={objKey}
                       />
                );
              })}
               </Box>
               <Button
              type="submit"
             
              sx={{
                ...TEMPLATE_BUTTON_CREATE,
                mt:"26px",
                width: "466px",
                ...{ textTransform: "none" },
              }}

            >
              Submit
            </Button>
            </FormControl>
             </Box>:
            <Box>
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
            <FormControl 
              sx={{mt:"36px"}}
              >
               <Box>
                 {FIELD_EMAIL.map((el) => {
                   let { name: value, isPassword, key: objKey, error } = el;
                   return (
                      <SignUpField
                         {...{ isPassword, register, value, objKey, errors, error }}
                         key={objKey}
                       />
                );
              })}
               </Box>
               <Button
              type="submit"
              onClick={() => {
                handleSubmit(data=>{
                  dispatch(ResetPassword(data.email))
                })()
              }}
              sx={{
                ...TEMPLATE_BUTTON_CREATE,
                mt:"26px",
                width: "466px",
                ...{ textTransform: "none" },
              }}

            >
              Submit
            </Button>
            <Box sx={{
              mt:2,
              display:"flex",
              alignItems:"center",
              gap:"6px",
              justifyContent:"center",
              ...DIALOG_TEXT
              }}>
              Dont you have an account?
              <Box sx={{
                color:MAIN_PURPLE,
                cursor:"pointer",
                fontWeight:600
              }}
              onClick={()=>navigate(SIGN_UP_ROUTE)}
              >
                Sign up
              </Box>
            </Box>

            </FormControl>
              </Box>}
            
          </ContentContainer>
        </Box>
      </BackgroundImage>
      </Box>
    </>
  );
}

export default ForgotPassword;
