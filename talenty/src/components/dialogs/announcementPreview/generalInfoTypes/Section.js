import {DIALOG_TITLE_COLOR} from "../../../../constants/colors";
import {Box} from "@mui/material";

export default function Section({data, generalInfoData}) {
    const gridSection = generalInfoData.fields.find(el => el.metadata.type === 'grid_section')
    return <Box sx={{
        display: 'flex',
        gap: '10px',
        mt: gridSection.fields.some(el => el.metadata.submitted_value) ? '24px' : '0px',
        alignItems: "center"
    }}
    >
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