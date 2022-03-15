import {Box} from "@mui/material";
import {INPUT_LABEL} from "../../shared/styles";

export default function JobSeekerSubsection({label, sx, Component}) {
    return <Box sx={{display: 'flex', flexDirection: 'column', ...sx}}>
        <Box sx={INPUT_LABEL}>{label}</Box>
        {Component}
    </Box>
}
