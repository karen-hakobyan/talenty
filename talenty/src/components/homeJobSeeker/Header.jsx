import {useState} from "react";
import {Box, IconButton, Menu, MenuItem} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE_ROUTE} from "../../constants/routes";
import {LOGO} from "../landingPage/style";
import {SUB_ROUTES_GENERATOR} from "./helper";
import {CONTAINER_HEADER} from "./style";
import {ArrowDown, UserExPhoto} from "../../assets/icons/jobseeker";
import {setAuthInitialState} from "../../store/auth/authSlice";
import {useDispatch} from "react-redux";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const navigate = useNavigate();
    const dispatch = useDispatch()

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
                {SUB_ROUTES_GENERATOR.map((el) => {
                    return (
                        <Box
                            key={el.key}
                            sx={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                navigate(`${HOME_PAGE_ROUTE}${el.path}`);
                            }}
                        >
                            {el.name}
                        </Box>
                    );
                })}
            </Box>
            <Menu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} open={isMenuOpen}>
                <MenuItem onClick={() => dispatch(setAuthInitialState(navigate))}>Sign out</MenuItem>
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
