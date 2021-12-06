import TextField from "@mui/material/TextField";
import { Box, styled } from "@mui/system";
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
      borderColor: MAIN_PURPLE,
      paddingBottom: 1,
    },
  },
  color: TEXT,
  paddingTop: 1,
  width: "80%",
});

const SignUpFields = ({ label }) => {
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <>
      <StyledSpan>{label.name}</StyledSpan>
      <Box sx={{ display: "flex", alignItems: "center" }}>
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
                label.valid(label.value) ? setErr(false) : setErr(true)
              }
            />
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                  color: MAIN_PURPLE,
                },
              }}
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
            helperText={err && label.errMsg}
            size="small"
            onBlur={() =>
              label.valid(label.value) ? setErr(false) : setErr(true)
            }
          />
        )}
      </Box>
    </>
  );
};

export default SignUpFields;
