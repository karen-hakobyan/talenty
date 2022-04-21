import {Box} from "@mui/material";

// Shared ContainerStyle
export default function JobSeekerContainer({children}) {
    return <Box sx={{pt: "38px", pl: "60px", pr: "60px"}}>
        {children}
    </Box>
}