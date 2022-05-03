import React, {useState, useEffect} from "react";
import {styled} from "@mui/system";
import "../fonts/index.css";
import {
    ELECTRICVIOLET,
    ERROR_COLOR,
    TEXT,
    PLACEHOLDER_GRAY,
} from "../style/colors";
import {
    companyNameValid,
    emailValid,
    passValid,
} from "../helpers/validation/fieldValidations";

const Container = styled("div")({
    marginTop: 20,
});

const H5 = styled("h5")(({theme}) => ({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    color: TEXT,
    marginLeft: 3,
    marginBottom: 10,
}));

const Inputs = styled("input")(({theme}) => ({
    background: "#FFFFFF",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    color: PLACEHOLDER_GRAY,
    paddingLeft: 8,
    paddingRight: 8,
    border: "1px solid #D9D9D9",
    borderRadius: "4px",
    height: "40px",
    outlineColor: ELECTRICVIOLET,

    transition: "all 0.4s",
    "&:focus": {
        color: TEXT,
        transition: "all 0.4s",
    },
    "&.error": {
        transition: "all 0.4s",
        border: `1px solid ${ERROR_COLOR}`,
    },
}));
const ErrorText = styled("p")({
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "20px",
    color: ERROR_COLOR,
    marginTop: 6,
});

function AuthInput(props) {
    const onChange = props.onChange;
    const width = props.width;
    const text = props.text;
    const placeholder = props.placeholder;
    const value = props.value;
    const validetion = props.validetion;
    const password = props.password;
    const label = props.label;
    const errorText = props.errorText;

    const [isDirty, setIsDirty] = useState(false);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (validetion && text.toLowerCase().includes("confirm")) {
            return setErr(value === password);
        } else if (validetion && text.toLowerCase().includes("company")) {
            return setErr(companyNameValid(value));
        } else if (validetion && text.toLowerCase().includes("email")) {
            return setErr(emailValid(value));
        } else if (validetion && text.toLowerCase().includes("password")) {
            return setErr(passValid(value));
        } else {
            return setErr(false);
        }
    }, [err, text, validetion, value]);

    return (
        <>
            <Container>
                <H5>{text}</H5>

                <Inputs
                    className={
                        validetion && err === false && isDirty === true ? "error" : ""
                    }
                    sx={{
                        maxWidth: !width ? "466px" : width,
                        width: "100%",
                    }}
                    type={text.toLowerCase().includes("password") ? "password" : "text"}
                    onChange={onChange}
                    placeholder={placeholder}
                    onBlur={() => (!err ? setIsDirty(true) : setIsDirty(false))}
                    value={value}
                />
                {validetion && err === false && isDirty === true && errorText ? (
                    <ErrorText>{errorText ? errorText : "incorect text"}</ErrorText>
                ) : null}
            </Container>
        </>
    );
}

export default AuthInput;
