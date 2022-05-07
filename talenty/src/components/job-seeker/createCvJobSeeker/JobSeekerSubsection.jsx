import {Box} from "@mui/material";
import {INPUT_LABEL} from "../../../shared/styles";
import {ReactComponent as RequiredSVG} from "../../../assets/icons/required.svg";

export default function JobSeekerSubsection({label, sx, Component,isRequired}) {

    return <Box sx={{display: 'flex', flexDirection: 'column', ...sx}}>
        <Box sx={INPUT_LABEL}>{label}<Box>{isRequired &&<RequiredSVG style={{marginBottom: '10px'}}/>}</Box></Box>
        {Component}
    </Box>
}
