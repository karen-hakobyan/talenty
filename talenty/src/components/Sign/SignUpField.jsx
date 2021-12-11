import { Box } from "@mui/system";
import "../../fonts/index.css";
import { TEXT } from "../../constants/colors";
import { StyledSpan, CssTextField } from "./signUp";

const SignUpFields = ({ label }) => {
  return (
    <>
      <StyledSpan>{label.name}</StyledSpan>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {label.isPass ? (
          <>
            <CssTextField
              placeholder={label.name}
              value={label.value}
              onChange={(e) => label.onChange(e.target.value)}
              sx={{ color: TEXT, paddingTop: 1 }}
              type="password"
              size="small"
              // error={err}
              // helperText={err && label.errMsg}
              // onBlur={() =>
              //   label.valid(label.value) ? setErr(false) : setErr(true)
              // }
            />
            {/* <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 28,
                  color: MAIN_PURPLE,
                },
              }}
              checked={show}
              onClick={() => setShow((prev) => !prev)}
            /> */}

          </>
        ) : (
          <CssTextField
            placeholder={label.name}
            value={label.value}
            onChange={(e) => label.onChange(e.target.value)}
            size="small"
          />
        )}
      </Box>
    </>
  );
};

export default SignUpFields;
