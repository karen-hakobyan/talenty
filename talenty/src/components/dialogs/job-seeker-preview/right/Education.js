import {Box} from "@mui/material";
import {
    CONTAINER_DATE_STYLE,
    CONTAINER_SUBTITLE,
    CONTAINER_SUBTITLE_CHILD,
    CONTAINER_SUBTITLE_CONTAINER,
    PREVIEW_TITLE
} from "../constants";
import MUIRichTextEditor from "mui-rte";

export default function Education({data}) {
    if (data.fields.every(el => !el.fields[0].metadata.submitted_value)) {
        return null
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Box sx={PREVIEW_TITLE}>{data.name === 'Education and Training' ? 'EDUCATION' : 'WORK EXPERIENCE'}</Box>
        <Box sx={{display: 'flex', gap: '6px', flexDirection: 'column'}}>
            {data.fields.map(el => {
                const [name, location, degree, {fields: [start, end, stillStudying]}, details] = el.fields
                return <Box
                    sx={{display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'Poppins'}}
                    key={el.id}
                >
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Box sx={CONTAINER_SUBTITLE_CONTAINER}>
                            <Box sx={CONTAINER_SUBTITLE}>{name.metadata.submitted_value}</Box>
                            {degree.metadata.submitted_value && <Box sx={CONTAINER_SUBTITLE_CHILD}>
                                {degree.metadata.submitted_value + ','} {location.metadata.submitted_value}
                            </Box>}
                        </Box>
                        {start.metadata.submitted_value &&
                            <Box sx={CONTAINER_DATE_STYLE}>
                                {start.metadata.submitted_value?.replaceAll('/', '.')}
                                - {stillStudying.metadata.submitted_value ? 'Now' : end.metadata.submitted_value?.replaceAll('/', '.')}
                            </Box>}
                    </Box>
                    <Box sx={{width: '570px', mt: '-12px'}}>
                        <MUIRichTextEditor controls={[]} readOnly defaultValue={details.metadata.submitted_value}/>
                    </Box>
                </Box>
            })}
        </Box>
    </Box>
}