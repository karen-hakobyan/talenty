import {Box} from "@mui/material";
import { selectAuthLoading } from "../../store/auth/selector";
import { useSelector } from "react-redux";
// Shared ContainerStyle
export default function JobSeekerContainer({children}) {
    const loading = useSelector(selectAuthLoading)
    return <Box sx={{pt: "38px", pl: "60px", pr: "60px", ...(loading ? {display: 'none'}: {})}}>
        {children}
    </Box>
}
