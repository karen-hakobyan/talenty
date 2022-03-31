import {DIALOG_TITLE_COLOR} from "../../../../constants/colors";
import {Box} from "@mui/material";

export default function Section({data}) {
    
    return <Box sx={{mt: '24px', display: 'flex', gap: '10px'}} alignItems="center">
        <Box sx={{width: '25px', height: '25px', borderRadius: '50%', background: DIALOG_TITLE_COLOR}}/>
        <Box sx={{fontWeight: 400, fontFamily: 'Proxima Nova'}}>
            Salary: {data.fields.reduce(
            (acc, {metadata}) => {
                return acc ?
                    metadata.submitted_value ?
                        `${acc}-${metadata.submitted_value}` :
                        ''
                    :
                    metadata.submitted_value || ''
            }, '')}
        </Box>
    </Box>
}