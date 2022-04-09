import React from "react";
import {styled} from "@mui/system";
import "../fonts/index.css";
import {ELECTRICVIOLET, FRENCH_VIOLET, WHITE} from "../constants/colors";
import {Box} from "@mui/material";
// import { Button } from "@mui/material";

const Button = styled(Box)(({theme}) => ({
    height: "40px",
    width: "100%",
    outline: "none",
    background: ELECTRICVIOLET,
    borderRadius: "4px",
    marginTop: 26,
    transition: "all 0.4s",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: FRENCH_VIOLET,
        transition: "all 0.4s",
    },
}));
const Text = styled("span")(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "22px",
    color: WHITE,
}));

function AuthButton(props) {
    const onClick = props.onClick;
    const width = props.width;
    const text = props.text;
    return (
        <>
            {/* <Button variant="outlined">{text}</Button> */}

            <Button
                onClick={onClick}
                sx={{
                    maxWidth: width ? width : "466px",
                }}
            >
                <Text>{text}</Text>
            </Button>
        </>
    );
}

export default AuthButton;
