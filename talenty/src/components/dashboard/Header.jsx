import {Box, Button} from "@mui/material";
import {NotificationSVG} from "../../assets/icons/personalInfo";
import {PINK_BUTTON} from "../../shared/styles";
import {LOGO} from "../landingPage/style";
import {CONTAINER_HEADER} from "./style";

export default function Header() {
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
            </Box>
        </Box>
    );
}
