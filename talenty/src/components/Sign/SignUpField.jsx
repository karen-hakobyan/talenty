import { useDispatch } from "react-redux";
import { onChangeAction } from "../../features/signUp/signUpSlicer";
import { Box } from "@mui/system";
import "../../fonts/index.css";
import { MAIN_PURPLE, TEXT } from "../../constants/colors";
import { useState } from "react";
import { Checkbox } from "@mui/material";
import { StyledSpan, CssTextField } from "./signUp";
import {
  companyNameValid,
  nameValid,
  emailValid,
  passValid,
} from "../../helpers/validation/fieldValidations";

const SignUpFields = ({ label }) => {
  const [err, setErr] = useState(false);
  const validate =
    label.action === "companyName"
      ? companyNameValid
      : label.action === "firstName" || label.action === "lastName"
      ? nameValid
      : label.action === "email"
      ? emailValid
      : passValid;
  const dispatch = useDispatch();
  return (
    <>
      <StyledSpan>{label.name}</StyledSpan>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {label.name.toLowerCase().includes("password") ? (
          <>
            <CssTextField
              placeholder={label.name}
              value={label.value}
              onChange={(e) =>
                dispatch(
                  onChangeAction({
                    inputName: label.inputName,
                    value: e.target.value,
                  })
                )
              }
              sx={{ color: TEXT, paddingTop: 1 }}
              // type={!show ? "password" : "text"}
              type="password"
              size="small"
              error={err}
              helperText={err && label.errMsg}
              onBlur={() =>
                validate(label.value) ? setErr(false) : setErr(true)
              }
            />
          </>
        ) : (
          <CssTextField
            placeholder={label.name}
            value={label.value}
            onChange={(e) =>
              dispatch(
                onChangeAction({
                  inputName: label.inputName,
                  value: e.target.value,
                })
              )
            }
            error={err}
            helperText={err && label.errMsg}
            size="small"
            onBlur={() =>
              validate(label.value) ? setErr(false) : setErr(true)
            }
          />
        )}
      </Box>
    </>
  );
};

export default SignUpFields;
