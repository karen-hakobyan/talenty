import {useEffect, useState} from "react";
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {useNavigate, useLocation} from "react-router-dom";
import {HOME_PAGE_ROUTE} from "../../../constants/routes";
import {LOGO} from "../../landingPage/style";
import {SUB_ROUTES_GENERATOR} from "./helper";
import {CONTAINER_HEADER} from "./style";
import {ArrowDown, UserExPhoto} from "../../../assets/icons/jobseeker";
import {setAuthInitialState} from "../../../store/auth/authSlice";
import {useDispatch} from "react-redux";
import {MAIN_PURPLE} from "../../../constants/colors";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [routesGenerator, setRoutesGenerator] = useState(SUB_ROUTES_GENERATOR)
    const location = useLocation()
    const isMenuOpen = Boolean(anchorEl)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        if (location.pathname) {
            let path = location.pathname.split('/')[2]
            setRoutesGenerator(prev => prev.map(el => el.path === path ? {...el, active: true} : {
                ...el,
                active: false
            }))
        }
    }, [location])

    return (
        <Box sx={CONTAINER_HEADER}>
            <Box sx={LOGO}>Talenty.</Box>
            <Box
                sx={{
                    display: "flex",
                    ml: "87px",
                    gap: "44px",
                }}
            >
                {routesGenerator.map((el) => {
                    return (
                        <Box
                            key={el.key}
                            sx={{
                                cursor: "pointer",
                                position: "relative",
                                transition: "all 0.5s"
                            }}
                            onClick={() => {
                                navigate(`${HOME_PAGE_ROUTE}${el.path}`);
                                setRoutesGenerator(prev => {
                                    return prev.map((element,) => {
                                        return element.key === el.key ? {...element, active: true} : {
                                            ...element,
                                            active: false
                                        }
                                    })
                                })
                            }}
                        >
                            <Box>{el.name}</Box>
                            {el.active && <Box sx={{
                                width: "100%",
                                height: "2px",
                                background: MAIN_PURPLE,
                                position: "absolute",
                                right: 0,
                                bottom: "-21px",
                                transition: "all 0.5s"
                            }}/>}
                        </Box>
                    );
                })}
            </Box>
            <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={isMenuOpen}>
                <MenuItem onClick={() => dispatch(setAuthInitialState())}>Sign out</MenuItem>
            </Menu>
            <Box sx={{display: 'flex', flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
                <UserExPhoto/>
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{cursor: 'pointer'}}>
                    <ArrowDown/>
                </IconButton>
            </Box>
        </Box>
    );
}
