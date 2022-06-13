import {useState} from "react";
import {useDispatch} from "react-redux";
import {Box, Button, IconButton, Menu, MenuItem} from "@mui/material";
import {NotificationSVG} from "../../assets/icons/personalInfo";
import {PINK_BUTTON} from "../../shared/styles";
import {LOGO} from "../landingPage/style";
import {CONTAINER_HEADER} from "./style";
import {ArrowDown, UserExPhoto } from "../../assets/icons/jobseeker";
import {setAuthInitialState} from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE_ROUTE, JOBSEEKER_PROFILE_ROUTE } from "../../constants/routes";

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <Box sx={CONTAINER_HEADER}>
            <Box sx={LOGO} onClick={()=>navigate(HOME_PAGE_ROUTE)}>Talenty.</Box>
            <Box sx={{display: "flex", gap: "16px"}}>
                <Box sx={{pr: "16px", borderRight: "1px solid #D7D7D7",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button
                        sx={{...PINK_BUTTON, width: "147px",}}
                        style={{textTransform: "none"}}
                    >
                        Upgrade pro
                    </Button>
                </Box>
                <Box sx={{pr: "16px", borderRight: "1px solid #D7D7D7",display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <NotificationSVG/>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box sx={{mr:"10px"}}><UserExPhoto/></Box>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{cursor: 'pointer'}}>
                        <ArrowDown />
                    </IconButton>
                </Box>
            </Box>
            <Menu onClose={() => setAnchorEl(null)} anchorEl={anchorEl} open={isMenuOpen}>
                <MenuItem onClick={()=>{
                    console.log("clike");
                    navigate(JOBSEEKER_PROFILE_ROUTE)}}>Edit profile</MenuItem>
                <MenuItem onClick={() => dispatch(setAuthInitialState())}>Sign out</MenuItem>
            </Menu>
        </Box>
    );
}
