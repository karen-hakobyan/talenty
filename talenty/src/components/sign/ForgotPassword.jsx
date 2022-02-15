import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, styled } from "@mui/system";
import { Button, FormControl, Typography } from "@mui/material";
import "../../fonts//index.css";
import {
  NIGHT_RIDER,
  TEXT,
} from "../../constants/colors";
import BackgroundImage from "./BackgroundImage";
import { useForm } from "react-hook-form";
import { FIELD_EMAIL } from "./helper";
import SignUpField from "./SignUpField";
import { TEMPLATE_BUTTON_CREATE } from "../../shared/styles";

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



function ForgotPassword() {
  const [errEmail, setErrEmail] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const field = FIELD_EMAIL  
  console.log(errors
    );

  //TODO change this url
  // const onSubmit = () => {
  //   axios
  //     .get(`http://localhost:7800/reset/password?email=${email}`)
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  useEffect(() => {
    if (!errEmail) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [disabled, errEmail]);

  return (
    <>
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
              onSubmit={handleSubmit((data)=>{
                console.log(data)
              })}
              >
               <Box>
                 {field.map((el) => {
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
              onClick={handleSubmit(data=>{
                console.log(data)
              })}
              sx={{
                ...TEMPLATE_BUTTON_CREATE,
                mt:"26px",
                width: "466px",
                ...{ textTransform: "none" },
              }}
            >
              Sign up
            </Button>

            </FormControl>
          </ContentContainer>
        </Box>
      </BackgroundImage>
    </>
  );
}

export default ForgotPassword;
