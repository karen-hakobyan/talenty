import React, { useState} from "react";
import axios from "axios";
import { Box, styled } from "@mui/system";
import { Button, Dialog, FormControl, Typography } from "@mui/material";
import "../../fonts//index.css";
import {
  NIGHT_RIDER,
  TEXT,
} from "../../constants/colors";
import BackgroundImage from "./BackgroundImage";
import { useForm } from "react-hook-form";
import { FIELD_EMAIL } from "./helper";
import SignUpField from "./SignUpField";
import {  TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import { getForgotPassword } from "../../constants/requests";
import { useNavigate } from "react-router-dom";
import { SIGN_IN_ROUTE } from "../../constants/routes";
import { DIALOG_TEXT, FLEX_CONTAINER } from "./style";

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


const ContentContainer = styled("div")(({ tehem }) => ({
  maxWidth: 466,
  marginLeft: "154px",
}));

const dialogMesseng ="Try again "



function ForgotPassword() {
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldFocusError: false,
  });
  const navigate = useNavigate()
  console.log(open)

 

  return (
    <>
    <Box>
      <Dialog
        open={!!open}
        onClose={()=>setOpen(false)}
        maxWidth={false}>
          <Box sx={FLEX_CONTAINER}>
              <Box sx={{...DIALOG_TEXT,color:"#000"}}>Try again</Box>
              <Button sx={{
                ...TEMPLATE_BUTTON_CREATE, width: "176px" 
              }}
              onClick={()=>setOpen(false)}
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
                  axios.get(getForgotPassword(data.email))
                    .then((res) =>navigate(SIGN_IN_ROUTE))
                    .catch((e) => {
                      console.log(e)
                      setOpen(dialogMesseng)
                    });
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

            </FormControl>
          </ContentContainer>
        </Box>
      </BackgroundImage>
      </Box>
    </>
  );
}

export default ForgotPassword;
