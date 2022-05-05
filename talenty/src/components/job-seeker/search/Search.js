import useGetSearchData from "../hook";
import {Box} from "@mui/material";
import {JOBS_TITLE} from "../../../style/texts";

export default function Search({SearchComponent, searchButtonClick, setSearchButtonClick, isInitiallyGetData}) {
    const data = useGetSearchData({searchButtonClick, setSearchButtonClick, isInitiallyGetData});
    return (
        <Box>
            <Box sx={{pb: "5px", borderBottom: "2px solid #D2D2D2"}}>
                <Box sx={JOBS_TITLE}>Search for jobs</Box>
            </Box>
            {
                SearchComponent && <Box sx={{mt: '24px'}}>
                    {SearchComponent}
                </Box>
            }
            <Box sx={{display: "flex", flexDirection: "column", gap: "40px"}}></Box>
        </Box>
    );
}
