import {Box} from "@mui/material";
import {PREVIEW_TITLE} from "../constants";
import MUIRichTextEditor from "mui-rte";

export default function AdditionalInfo({data}) {
    if (!data.fields[0].metadata.submitted_value) {
        return null
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', width: '570px'}}>
        <Box sx={PREVIEW_TITLE}>ADDITIONAL INFORMATION</Box>
        <MUIRichTextEditor defaultValue={data.fields[0].metadata.submitted_value} controls={[]} readOnly/>
    </Box>
}