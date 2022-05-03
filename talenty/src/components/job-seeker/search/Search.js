import useGetSearchData from "./hook";
import {Box} from '@mui/material'
import {JOBS_TITLE} from "../../../style/texts";

export default function Search() {
    const data = useGetSearchData()
    console.log(data)
    return <Box sx={{padding: '52px 60px'}}>
        <Box sx={{pb: '5px', borderBottom: '2px solid #D2D2D2'}}>
            <Box sx={JOBS_TITLE}>Search for jobs</Box>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '40px'}}>
            <Box sx={JOBS_TITLE}>All jobs</Box>
        </Box>
    </Box>
}