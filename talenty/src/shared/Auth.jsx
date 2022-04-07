import TextField from "@mui/material/TextField";
import {styled} from "@mui/system";
import ".././fonts/index.css";
import {useState, useEffect} from "react";
import {Checkbox} from "@mui/material";
import {PLACEHOLDER_GRAY, TEXT} from "../constants/colors";
import {
    companyNameValid,
    emailValid,
    passValid,
} from "../helpers/validation/fieldValidations";

const Container = styled("div")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
}));

const StyledSpan = styled("span")({
    fontFamily: "'Poppins', sans-serif",
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
        "&:hover": {borderColor: "#9c27b0"},
    },
    "&::placeholder": {
        color: PLACEHOLDER_GRAY,
    },
    "&:hover": {borderColor: "#9c27b0"},
    color: TEXT,
    paddingTop: 1,
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
});

const Auth = ({label}) => {
    const [err, setErr] = useState(false);
    const [show, setShow] = useState(false);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        if (label.validetion && label.name.toLowerCase().includes("confirm")) {
            return setErr(label.value === label.validetion);
        } else if (
            label.validetion &&
            label.name.toLowerCase().includes("password")
        ) {
            return setErr(passValid(label.value));
        } else {
            return setErr(false);
        }
    }, [err, label]);
    console.log(label.errorText, "valid");
    return (
        <Container>
            <StyledSpan>{label.name}</StyledSpan>

            <CssTextField
                placeholder={label.placeholder ? label.placeholder : label.name}
                value={label.value}
                onChange={(e) => label.onChange(e.target.value)}
                sx={{color: TEXT, paddingTop: 1}}
                type={
                    label.name.toLowerCase().includes("password") ? "password" : "text"
                }
                size="small"
                error={
                    label.validetion && err === false && isDirty === true ? true : false
                }
                onBlur={() => (err ? setIsDirty(true) : setIsDirty(false))}
                helperText={
                    label.validetion &&
                    err === false &&
                    isDirty === true &&
                    label.errorText
                        ? label.errorText
                        : null
                }
            />
        </Container>
    );
};
export default Auth;
