import { useState } from "react";
import { Button, Checkbox, FormControl, Typography } from "@mui/material";
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

export default function SignUp({ isCompany }) {
  const [terms, setTerms] = useState(false);
  const fields = useMemo(
    () => (isCompany ? FIELDS_COMPANY : FIELDS),
    [isCompany]
  );
  const { register, handleSubmit } = useForm();
  //     axios
  //       .post(POST_SIGN_UP, {
  //         ...data,
  //       })
  //       .then((resp) => {
  //         console.log(resp);
  //       })
  //       .catch((err) => {
  //         console.log(new Error(err));
  //         setAlertMsg("Something went wrong please try after few minutes");
  //       });
  //   }
  // };
  return (
    <StyledContainer>
      <StyledDiv>
        <FormControl
          onSubmit={handleSubmit((data) => {
            let path = isCompany ? POST_SIGN_UP_HR : POST_SIGN_UP_JOB_SEEKER;
            axios.post(path, data).then((res) => {
              console.log(res);
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
              let { name: value, isPassword, key: objKey } = el;
              return (
                <SignUpField
                  {...{ isPassword, register, value, objKey }}
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
