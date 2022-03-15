import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Box, styled } from "@mui/system";
import { useNavigate} from "react-router-dom";
import { Button,  FormControl, Typography } from "@mui/material";
import "../../fonts//index.css";
import {
  NIGHT_RIDER,
} from "../../constants/colors";
import { useForm } from "react-hook-form";
import {  FIELD_RESET_PASSWORD } from "./helper";
import SignUpField from "./SignUpField";
import {  TEMPLATE_BUTTON_CREATE } from "../../shared/styles";
import {  selectIsValidToken } from "../../store/auth/selector";
import { ChangePassword,ValidateToken } from "../../store/auth/ChangePassword";

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

function ResetPasswordComponent({token}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isValidToken = useSelector(selectIsValidToken)
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(()=>{
    	dispatch(ValidateToken(token))
  },[dispatch,token])


  useEffect(() => {
    if(isValidToken === false) {
      navigate('/')
    }
  },[isValidToken,navigate])
  
  return  (
    <>
    <Box>
      
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
                   let { name: value, isPassword, key: objKey, error,placeholder } = el;
                   return (
                      <SignUpField
                         {...{ isPassword, register, value, objKey, errors, error,placeholder }}
                         key={objKey}
                       />
                );
              })}
               </Box>
                       <Button
                       onClick={()=>{
                          handleSubmit(data=>{
                            let dataChange = {
                              token,
                              data
                            }
                            dispatch(ChangePassword(dataChange))
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
             </Box>
              
      </Box>
    </>
  );
}
export default ResetPasswordComponent