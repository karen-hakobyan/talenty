import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import Login from '../../store/auth/Login'
import {styled} from "@mui/system";
import {useLocation, useNavigate} from "react-router-dom";
import {TalentyLogo} from "../../assets/sign";
import "../../fonts/index.css";
import {Box, Button, Checkbox, Dialog, FormControl} from "@mui/material";
import SignInField from "./SignInField";
import {TEMPLATE_BUTTON_CREATE} from "../../shared/styles";
import {
    FORGOT_PASSWORD_ROUTE,
    LANDING_PAGE_ROUTE,
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
} from "../../constants/routes";
import {MAIN_PURPLE} from "../../style/colors";
import BackgroundImage from "./BackgroundImage";
import {DIALOG_TEXT, FLEX_CONTAINER} from "./style";
import {selectAuthModalInfo, selectIsValidToken} from "../../store/auth/selector";
import {setAuthModalInfo, setIsValidToken} from "../../store/auth/authSlice";
import {ENTER_KEY} from "../../constants/keyCodes";
import {FIELD_SIGN_IN} from "./helper";
import {ConfirmUser} from "../../store/auth/ConfirmUser";


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
    const dialogInfo = useSelector(selectAuthModalInfo)
    const isValidToken = useSelector(selectIsValidToken)
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const {search} = useLocation()
    const token = useMemo(() => search && search.split('=')[1], [search])
    const [isChangeToken, setISChangeToken] = useState(false)

    useEffect(() => {
        if (token.length !== 0) {
            setISChangeToken(true)
        }
    }, [isChangeToken, token])
    useEffect(() => {
        if (token) {
            dispatch(ConfirmUser(token))
        }
    }, [token, dispatch])
    useEffect(() => {
        if (isValidToken === false) {
            dispatch(setIsValidToken(null))
            navigate(LANDING_PAGE_ROUTE)
            setISChangeToken(false)
        }
        if (isValidToken) {
            dispatch(setIsValidToken(null))
            navigate(SIGN_IN_ROUTE)
            setISChangeToken(false)
        }
    }, [isValidToken, dispatch, navigate])


    if (isChangeToken && isValidToken === null) {
        return null
    }

    return (
        <>
            <Dialog
                maxWidth={false}
                open={!!dialogInfo}
                onClose={() => dispatch(setAuthModalInfo(null))}
            >
                <Box sx={FLEX_CONTAINER}>
                    <Box sx={{...DIALOG_TEXT}}>{dialogInfo}</Box>
                    <Button sx={{
                        ...TEMPLATE_BUTTON_CREATE, width: "176px"
                    }}
                            onClick={() => dispatch(setAuthModalInfo(null))}
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
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "25px",
                            fontWeight: 400,
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
                            {FIELD_SIGN_IN.map(({objKey, label, isPassword, error, placeholder}) => {
                                return (
                                    <SignInField
                                        key={objKey}
                                        {...{objKey, label, isPassword, register, errors, error, placeholder}}
                                        {...(isPassword ? {
                                            onKeyDown: (event) => {

                                                if (event.key === ENTER_KEY) {
                                                    handleSubmit((data) => {
                                                        dispatch(Login({data, isChecked}))
                                                    })()
                                                }
                                            }
                                        } : {})}
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
                                            fontFamily: "'Poppins', sans-serif",
                                            fontSize: 14,
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
                                        fontFamily: "'Poppins', sans-serif",
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
                                        dispatch(Login({data, isChecked}))
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
                                    fontFamily: "'Poppins', sans-serif",
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
                                        fontFamily: "'Poppins', sans-serif",
                                        fontWeight: 400,
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
