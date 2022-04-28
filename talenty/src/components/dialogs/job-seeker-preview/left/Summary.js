import {Box} from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import {PREVIEW_TITLE} from "../constants";

export default function Summary({data}) {
    if (!data.fields[0].metadata.submitted_value) {
        return null
    }
    return <Box sx={{width: '262px', display: 'flex', flexDirection: 'column'}}>
        <Box sx={PREVIEW_TITLE}>{data.name === 'Interests and Hobbies' ? 'Interests / Hobbies' : data.name}</Box>
        <MUIRichTextEditor defaultValue={data.fields[0].metadata.submitted_value} readOnly controls={[]}/>
    </Box>
}