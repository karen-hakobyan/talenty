import {useState, useMemo} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {
    Button,
    Checkbox,
    Dialog,
    FormControl,
    Typography,
} from "@mui/material";

import {Box} from "@mui/system";
import BackgroundImage from "./BackgroundImage";

import {style, MainStyledSpan} from "./signUp";
import {changeButtonInformation, FIELDS, FIELDS_COMPANY} from "./helper";
import SignUpField from "./SignUpField";
import {GLOBAL_TEXT, TEMPLATE_BUTTON_CREATE} from "../../shared/styles";
import {SIGN_IN_ROUTE} from "../../constants/routes";
import {
    BOTTOM_ITEMS,
    butonStyleGenerator,
    BUTON_STYLE,
    CHECKBOX_CONTAINER,
    CHECKBOX_STYLE,
    DIALOG_TEXT,
    FLEX_CONTAINER,
} from "./style";
import Registration from "../../store/auth/Registration";
import {selectAuthModalInfo} from "../../store/auth/selector";
import {setAuthModalInfo} from "../../store/auth/authSlice";

export default function SignUp() {
    const navigate = useNavigate();
    const [terms, setTerms] = useState(false);
    const [isCompany, setIsCompany] = useState(true);
    const dialogInfo = useSelector(selectAuthModalInfo)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
    } = useForm({
        mode: "onChange",
        shouldFocusError: false,
    });


    const fields = useMemo(
        () => (isCompany ? FIELDS_COMPANY(watch) : FIELDS(watch)),
        [isCompany, watch]
    );


    return (
        <Box>
            <Dialog
                open={!!dialogInfo}
                maxWidth={false}
                onClose={() => {
                    if (dialogInfo.ok) {
                        navigate(SIGN_IN_ROUTE);
                        dispatch(setAuthModalInfo(null))
                    } else {
                        dispatch(setAuthModalInfo(null))
                    }
                }}
            >
                <Box sx={FLEX_CONTAINER}>
                    <Box sx={BOTTOM_ITEMS}>
                        {dialogInfo?.message?.map((text) => {
                            return (
                                <Box key={text} sx={DIALOG_TEXT}>
                                    {text}
                                </Box>
                            );
                        })}
                    </Box>
                    <Button
                        style={{textTransform: "none",}}
                        sx={{...TEMPLATE_BUTTON_CREATE, width: "176px"}}
                        onClick={() => {
                            if (dialogInfo.ok) {
                                navigate(SIGN_IN_ROUTE);
                                dispatch(setAuthModalInfo(null))
                            } else {
                                dispatch(setAuthModalInfo(null))
                            }
                        }}
                    >
                        Ok
                    </Button>
                </Box>
            </Dialog>
            <BackgroundImage img={isCompany}>
                <FormControl
                    onSubmit={handleSubmit(data => {
                        dispatch(Registration({data, isCompany}))
                    })}
                    sx={style}
                    required
                    autoComplete="off"
                    component="form"
                >
                    <Box sx={{...BOTTOM_ITEMS, gap: "22px"}}>
                        <Box sx={BUTON_STYLE}>
                            {changeButtonInformation.map(({text, isCompanyState}) => (
                                <Box
                                    key={text}
                                    sx={butonStyleGenerator(isCompany, isCompanyState)}
                                    onClick={() => {
                                        setIsCompany(!!isCompanyState)
                                        reset()
                                    }}
                                >
                                    {text}
                                </Box>
                            ))}
                        </Box>
                        {fields.map((el) => {
                            let {name: value, isPassword, key: objKey, error, placeholder} = el;
                            return (
                                <SignUpField
                                    {...{isPassword, register, value, objKey, errors, error, placeholder}}
                                    key={objKey}

                                />
                            );
                        })}
                    </Box>

                    <Box sx={CHECKBOX_CONTAINER}>
                        <Box sx={{
                            display: "flex",
                            gap: "53px"
                        }}>
                            <Box sx={{width: 385}}>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...GLOBAL_TEXT,
                                        fontSize:14,
                                        mt: 3,
                                    }}
                                >
                                    By creating an account, I agree to Talenty???s{" "}
                                    <MainStyledSpan>Terms of use</MainStyledSpan> and{" "}
                                    <MainStyledSpan>Privacy policy</MainStyledSpan> and to receive
                                    emails
                                </Typography>
                            </Box>

                            <Checkbox
                                sx={CHECKBOX_STYLE}
                                required={true}
                                checked={terms}
                                onClick={() => setTerms((prev) => !prev)}
                            />

                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        sx={{
                            ...TEMPLATE_BUTTON_CREATE,
                            width: "466px",
                            ...{textTransform: "none"},
                        }}
                    >
                        Sign up
                    </Button>
                    <Box sx={{
                        display: 'flex',
                        gap: '6px',
                        fontFamily: 'Poppins',
                        fontWeight: 400,
                        fontSize: 15,
                        lineHeight: '22px',
                        color: '#4C494F',
                        justifyContent: 'center',
                        mt: '16px',
                    }}>
                        <Box>Already have an account?</Box>
                        <Box sx={{color: '#8C0DF0', cursor: 'pointer'}} onClick={() => {
                            navigate(SIGN_IN_ROUTE)
                        }}>Sign in</Box>
                    </Box>
                </FormControl>
            </BackgroundImage>
        </Box>

    );
}
