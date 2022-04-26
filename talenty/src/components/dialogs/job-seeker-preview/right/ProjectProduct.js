import {Box} from "@mui/material";
import {CONTAINER_SUBTITLE, CONTAINER_SUBTITLE_CHILD, CONTAINER_SUBTITLE_CONTAINER, PREVIEW_TITLE} from "../constants";

export default function ProjectProduct({data}) {
    if (data.fields.every(el => !el.fields[0].metadata.submitted_value)) {
        return null
    }
    return <Box sx={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <Box sx={PREVIEW_TITLE}>Real Projects</Box>
        {data.fields.map(el => {
            console.log(el)
            const [name, {fields: [start, end, stillStudying]}, url, description] = el.fields
            return <Box>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={CONTAINER_SUBTITLE_CONTAINER}>
                        <Box sx={CONTAINER_SUBTITLE}>{name.metadata.submitted_value}</Box>
                        <Box
                            sx={{
                                ...CONTAINER_SUBTITLE_CHILD,
                                cursor: url.metadata.submitted_value ? 'pointer' : 'default',
                                textDecoration: 'underline',
                            }}
                            onClick={() => {
                                if (url.metadata.submitted_value) {
                                    window.open(url.metadata.submitted_value, '_blank')
                                }
                            }}
                        >
                            {url.metadata.submitted_value}
                        </Box>
                    </Box>
                    <Box>
                        {start.metadata.submitted_value?.replaceAll('/', '.')}
                        -
                        {stillStudying.metadata.submitted_value ? 'Now' : end.metadata.submitted_value?.replaceAll('/', '.')}
                    </Box>
                </Box>
            </Box>
        })}
    </Box>
}
