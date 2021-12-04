import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import "../../fonts/index.css";
import { MAIN_PURPLE, TEXT } from "../../constants/colors";
import { useState } from "react";
import { Checkbox } from "@mui/material";

const StyledSpan = styled("span")({
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: "normal",
  fontSize: 16,
  marginTop: 12,
  paddingBottom: 5,
  color: TEXT,
});
const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#9c27b0",
      paddingBottom: 1,
    },
  },
  color: TEXT,
  paddingTop: 1,
});

const SignUpFields = ({ label }) => {
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <>
      <StyledSpan>{label.name}</StyledSpan>
      {label.name.toLowerCase().includes("password") ? (
        <>
          <CssTextField
            placeholder={label.name}
            value={label.value}
            onChange={(e) => label.onChange(e.target.value)}
            sx={{ color: TEXT, paddingTop: 1 }}
            type={!show ? "password" : "text"}
            size="small"
            error={err}
            onBlur={() =>
              label.valid(label.value)
                ? (setErr(false), (label.isValid = true))
                : setErr(true)
            }
          />
          <Checkbox
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: 28,
                color: MAIN_PURPLE,
              },
            }}
            className="checkbox"
            checked={show}
            onClick={() => setShow((prev) => !prev)}
          />
        </>
      ) : (
        <CssTextField
          placeholder={label.name}
          value={label.value}
          onChange={(e) => label.onChange(e.target.value)}
          error={err}
          size="small"
          onBlur={() =>
            label.valid(label.value) ? setErr(false) : setErr(true)
          }
        />
      )}
    </>
  );
};

export default SignUpFields;
