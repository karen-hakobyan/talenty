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
            />
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
