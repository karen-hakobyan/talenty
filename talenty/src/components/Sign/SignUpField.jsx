import { useDispatch } from "react-redux";
import { onChangeAction } from "../../features/signUp/signUpSlicer";
import { Box } from "@mui/system";
import "../../fonts/index.css";
import { TEXT } from "../../constants/colors";
import { StyledSpan, CssTextField } from "./signUp";

const SignUpFields = ({ label }) => {
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
              type="password"
              size="small"
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
            size="small"
          />
        )}
      </Box>
    </>
  );
};

export default SignUpFields;
