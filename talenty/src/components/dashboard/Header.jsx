import {useState} from "react";
import {useDispatch} from "react-redux";
import {Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import {NotificationSVG} from "../../assets/icons/personalInfo";
import {PINK_BUTTON} from "../../shared/styles";
import {LOGO} from "../landingPage/style";
import {CONTAINER_HEADER} from "./style";
import {ArrowDown, DefaultUserIcon} from "../../assets/icons/jobseeker";
import {setAuthInitialState} from "../../store/auth/authSlice";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const dispatch = useDispatch()

    return (
        <Box sx={CONTAINER_HEADER}>
            <Box sx={LOGO}>Talenty.</Box>
            <Box sx={{display: "flex", gap: "16px"}}>
                <Box sx={{pr: "16px", borderRight: "1px solid #D7D7D7"}}>
                    <Button
                        sx={{...PINK_BUTTON, width: "147px"}}
                        style={{textTransform: "none"}}
                    >
                        Upgrade pro
                    </Button>
                </Box>
                <Box sx={{pr: "16px", borderRight: "1px solid #D7D7D7"}}>
                    <NotificationSVG/>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <DefaultUserIcon/>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{cursor: 'pointer'}}>
                        <ArrowDown />
                    </IconButton>
                </Box>
            </Box>
            <Menu onClose={() => setAnchorEl(null)} anchorEl={anchorEl} open={isMenuOpen}>
                <MenuItem onClick={() => dispatch(setAuthInitialState())}>Sign out</MenuItem>
            </Menu>
        </Box>
    );
}
