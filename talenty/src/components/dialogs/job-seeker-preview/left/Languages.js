import {Box} from "@mui/material";
import {PREVIEW_TITLE} from "../constants";

export default function Languages({data}) {
    if (data.fields[0].fields.every(el => !el.metadata.submitted_value)) {
        return null
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Box sx={PREVIEW_TITLE}>Languages</Box>
        {data.fields.map(el => {
            return <Box
                sx={{fontSize: '14px', lineHeight: '21px', fontWeight: 500, fontFamily: 'Poppins'}}
                key={el.id}
            >
                {el.fields[0].metadata.submitted_value} - <span
                style={{fontStyle: 'italic'}}>{el.fields[1].metadata.submitted_value}</span>
            </Box>
        })}
    </Box>
}