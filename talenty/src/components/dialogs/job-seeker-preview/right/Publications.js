import {Box} from "@mui/material";
import {PREVIEW_TITLE} from "../constants";
import {publicationMap} from "./helper";

export default function Publication({data}) {
    if (data.fields.every(el => el.fields.length === 1 && !el.fields[0].metadata.submitted_value)) {
        return null
    }

    const [articleSection, bookSection] = data.fields
    return <Box sx={{display: 'flex', flexDirection: 'column', fontFamily: 'Poppins'}}>
        <Box sx={PREVIEW_TITLE}>
            PUBLICATIONS
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            {
                bookSection.fields[0].fields[0].metadata.submitted_value &&
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <Box sx={{color: '#323232', fontWeight: 500}}>
                        Books
                    </Box>
                    {bookSection.fields.map(publicationMap)}
                </Box>
            }
            {
                articleSection.fields[0].fields[0].metadata.submitted_value &&
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <Box sx={{color: '#323232', fontWeight: 500}}>
                        Articles
                    </Box>
                    {articleSection.fields.map(publicationMap)}
                </Box>
            }
        </Box>
    </Box>
}