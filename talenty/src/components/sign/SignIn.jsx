import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import Registration from '../../store/auth/Registration'
import {styled} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {TalentyLogo} from "../../assets/sign";
import "../../fonts/index.css";
import {Box, Button, Checkbox, Dialog, FormControl} from "@mui/material";
import {FIELD} from "./signInHelper";
import SignInField from "./SignInField";
import {TEMPLATE_BUTTON_CREATE} from "../../shared/styles";
import {
    DASHBOARD_ROUTE,
    FORGOT_PASSWORD_ROUTE, HOME_PAGE_ROUTE,
    SIGN_UP_ROUTE,
} from "../../constants/routes";
import {MAIN_PURPLE} from "../../constants/colors";
import BackgroundImage from "./BackgroundImage";
import {DIALOG_TEXT, FLEX_CONTAINER} from "./style";
import {selectAuthIsCompany, selectAuthJwt} from "../../store/auth/selector";

const Logo = styled("div")(() => ({
    display: "flex",
    justifyContent: "end",
    marginBottom: 146,
    paddingTop: 46,
    marginRight: 60,
}));

function SignIn() {
    const {register, handleSubmit, formState} = useForm({
        mode: "onChange",
        shouldFocusError: false,
    });
    const {errors} = formState;
    const dispatch = useDispatch()
    const [dialogInfo, setDialogInfo] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const jwt = useSelector(selectAuthJwt)
    const isCompany = useSelector(selectAuthIsCompany)
    console.log(jwt)
    // if jwt exist navigate dashboard
    useEffect(() => {
        if(jwt) {
            navigate(isCompany ? DASHBOARD_ROUTE: HOME_PAGE_ROUTE)
        }
    }, [jwt, isCompany, navigate]);

    return (
        <>
            <Dialog
                maxWidth={false}
                open={!!dialogInfo?.open}
                onClose={() => setDialogInfo(false)}
            >
                <Box sx={FLEX_CONTAINER}>
                    <Box sx={{...DIALOG_TEXT}}>{dialogInfo?.text}</Box>
                    <Button sx={{
                        ...TEMPLATE_BUTTON_CREATE, width: "176px"
                    }}
                            onClick={() => setDialogInfo(false)}
                    >
                        Ok
                    </Button>
                </Box>

            </Dialog>
            <BackgroundImage>
                <Logo>
                    <TalentyLogo/>
                </Logo>
                <Box sx={{paddingLeft: "154px"}}>
                    <Box
                        sx={{
                            fontFamily: "Proxima Nova",
                            fontSize: "25px",
                            fontWeight: 600,
                            lineHeight: "25px",
                            letterSpacing: "0.04em",
                            color: "#2F2F2F",
                        }}
                    >
                        Sign in
                    </Box>
                    <FormControl>
                        <Box
                            sx={{
                                pt: "42px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            {FIELD.map(({objKey, label, isPassword, error}) => {
                                return (
                                    <SignInField
                                        key={objKey}
                                        {...{objKey, label, isPassword, register, errors, error}}
                                    />
                                );
                            })}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{display: "flex", gap: "5px", alignItems: "center"}}>
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={() => setIsChecked((prev) => !prev)}
                                        sx={{borderRadius: "50%"}}
                                        icon={
                                            <Box
                                                sx={{
                                                    border: "2px solid black",
                                                    width: "22px",
                                                    height: "22px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        }
                                        checkedIcon={
                                            <Box
                                                sx={{
                                                    height: "22px",
                                                    width: "22px",
                                                    textAlign: "center",
                                                    color: "white",
                                                    borderRadius: "50%",
                                                    border: `2px solid ${MAIN_PURPLE}`,
                                                    background: `radial-gradient(circle at center, ${MAIN_PURPLE} 55%, transparent 0%)`,
                                                }}
                                            />
                                        }
                                    />
                                    <Box
                                        sx={{
                                            fontFamily: "Proxima Nova",
                                            fontSize: "16px",
                                            fontWeight: 400,
                                            lineHeight: "24px",
                                            letterSpacing: "0em",
                                            color: "#4C494F",
                                        }}
                                    >
                                        Remember me
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        cursor: "pointer",
                                        color: "#2C5282",
                                        fontFamily: "Proxima Nova",
                                        fontSize: "16px",
                                        fontWeight: 400,
                                        lineHeight: "19px",
                                        letterSpacing: "0em",
                                    }}
                                    onClick={() => navigate(FORGOT_PASSWORD_ROUTE)}
                                >
                                    Forgot password?
                                </Box>
                            </Box>
                            <Button
                                onClick={() => {
                                    handleSubmit((data) => {
                                        dispatch(Registration(data))
                                    })()
                                }}
                                sx={{...TEMPLATE_BUTTON_CREATE, width: "466px", textTransform: "none"}}
                            >
                                Sign in
                            </Button>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "6px",
                                    color: "#4C494F",
                                    fontFamily: "Proxima Nova",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "21px",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                Dont you have an account?
                                <Box
                                    onClick={() => {
                                        navigate(SIGN_UP_ROUTE);
                                    }}
                                    sx={{
                                        cursor: "pointer",
                                        color: "#8C0DF0",
                                        fontFamily: "Proxima Nova",
                                        fontWeight: 600,
                                        fontSize: "16px",
                                        lineHeight: "22px",
                                    }}
                                >
                                    Sign up
                                </Box>
                            </Box>
                        </Box>
                    </FormControl>
                </Box>
            </BackgroundImage>
        </>
    );
}

export default SignIn;
