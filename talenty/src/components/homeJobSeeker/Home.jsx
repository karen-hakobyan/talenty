import {useSelector} from "react-redux";
import {selectAuthUserInfo} from "../../store/auth/selector";
import {useNavigate} from "react-router-dom";
import {Box, Button, Switch} from "@mui/material";
import {DefaultUserIcon} from "../../assets/icons/jobseeker";
import {HOME_PRIMARY_BUTTON} from "../../shared/styles";
import MainBox from "./MainBox";
import {SWITCH, SWITCH_TITLE, USER_EMAIL, USER_NAME} from "./style";
import {MAIN_PURPLE} from "../../constants/colors";

export default function Home() {
    const navigate = useNavigate();
    const {email, firstName, lastName} = useSelector(selectAuthUserInfo)

    return (
        <Box sx={{pt: "52px", pl: "60px", pr: "60px"}}>
            <Box sx={{display: "flex", gap: "20px"}}>
                <MainBox>
                    <Box>
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                            <Box sx={{display: "flex", gap: "8px", alignItems: "center"}}>
                                <Box sx={SWITCH_TITLE}>Private</Box>
                                <Switch sx={SWITCH}/>
                                <Box sx={SWITCH_TITLE}>Public</Box>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "40px",
                                mt: "35px",
                                alignItems: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    background: MAIN_PURPLE,
                                    width: "78px",
                                    height: "78px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <DefaultUserIcon/>
                            </Box>
                            <Box
                                sx={{display: "flex", flexDirection: "column", gap: "12px"}}
                            >
                                <Box sx={{...USER_NAME}}>{firstName} {lastName}</Box>
                                <Box sx={{...USER_EMAIL}}>{email}</Box>
                            </Box>
                        </Box>
                        <Box sx={{mt: "50px"}}>input</Box>
                        <Box sx={{mt: "40px"}}>profile complitness</Box>
                        <Box
                            sx={{
                                mt: "67px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                sx={HOME_PRIMARY_BUTTON}
                                style={{textTransform: "none"}}
                            >
                                Complete my profile
                            </Button>
                            <Button
                                sx={HOME_PRIMARY_BUTTON}
                                style={{textTransform: "none"}}
                                onClick={() => {
                                    navigate('create-cv');
                                }}
                            >
                                Create CV
                            </Button>
                        </Box>
                    </Box>
                </MainBox>

                <MainBox isRegardingJobs/>
                <MainBox isRegardingJobs/>
            </Box>
        </Box>
    );
}
