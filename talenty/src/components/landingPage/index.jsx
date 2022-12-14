import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LANDING_ROUTES, PARAGRAPH_TEXT} from "./helper";
import {
    ACTIONS,
    BORDER_BOTTOM,
    BORDER_RIGHT,
    DEVIDER,
    FIRST_HEADER,
    IMAGE,
    IMAGE_TEXT_CONTAINER,
    LOGO,
    LOGO_NAV_CONTAINER,
    MAIN_CONTAINER_NAV,
    NAV_CONTAINER,
    NAV_ITEM,
    PARAGRAPH,
    PRIMARY_BUTTON,
    SECONDARY_BUTTON,
    SECOND_HEADER,
} from "./style";
import LandingImage from "../../assets/landing/landing.png";
import {DASHBOARD_ROUTE, HOME_PAGE_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE} from "../../constants/routes";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectAuthIsCompany, selectAuthUserInfo} from "../../store/auth/selector";

export default function LandingPage() {
    const navigate = useNavigate();
    const userInfo = useSelector(selectAuthUserInfo)
    const isCompany = useSelector(selectAuthIsCompany)

    useEffect(() => {
        if(userInfo) {
            navigate(navigate(isCompany ? DASHBOARD_ROUTE: HOME_PAGE_ROUTE))
        }
    }, [isCompany, userInfo, navigate])
    return (
        <Box>
            <Box sx={MAIN_CONTAINER_NAV}>
                <Box sx={LOGO_NAV_CONTAINER}>
                    <Box sx={LOGO}>Talenty.</Box>
                    <Box sx={NAV_CONTAINER}>
                        {LANDING_ROUTES.map((el) => {
                            return (
                                <Box
                                    onClick={() => {
                                        navigate(el.route);
                                    }}
                                    key={el.name}
                                    sx={NAV_ITEM}
                                >
                                    {el.name}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
                <Box sx={ACTIONS}>
                    <Button
                        style={{textTransform: "none"}}
                        sx={SECONDARY_BUTTON}
                        onClick={() => {
                            navigate(SIGN_IN_ROUTE);
                        }}
                    >
                        Sign in
                    </Button>
                    <Button
                        style={{textTransform: "none"}}
                        sx={PRIMARY_BUTTON}
                        onClick={() => navigate(SIGN_UP_ROUTE)}
                    >
                        Sign up
                    </Button>
                </Box>
            </Box>
            {/* below image and texts */}
            <Box sx={IMAGE_TEXT_CONTAINER}>
                <Box>
                    <Box sx={FIRST_HEADER}>Smart HR platform to</Box>
                    <Box sx={SECOND_HEADER}>FASTER HIRING</Box>
                    <Box sx={PARAGRAPH}>{PARAGRAPH_TEXT}</Box>
                    <Button sx={{...PRIMARY_BUTTON, width: "292px", mt: "44px"}}>
                        Start Free Trial
                    </Button>
                </Box>
                <Box>
                    <Box sx={{display: "flex"}}>
                        <img src={LandingImage} alt="" style={IMAGE}/>
                        <Box sx={BORDER_RIGHT}/>
                    </Box>
                    <Box sx={BORDER_BOTTOM}/>
                </Box>
            </Box>
            <Box sx={DEVIDER}/>
        </Box>
    );
}
