import {Box} from "@mui/material";
import {MONTH_VIA_KEY} from "../../../../constants/date";

export default function Title({generalInfoData, data}) {
    let deadline = generalInfoData.fields.find(el => el.name === 'Deadline')
    let deadlineValue = deadline ? deadline.metadata?.submitted_value?.split('/') : null
    if (!data.metadata.submitted_value) {
        return "here should be your announcement title and deadline"
    }
    return <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: '24px',
            lineHeight: '29px',
            color: '#5D00A6',
            letterSpacing: '0.02em',
        }}>{data.metadata.submitted_value}</Box>
        {
            deadline.metadata.submitted_value &&
            <Box sx={{
                color: '#FF0000',
                fontSize: '20px',
                lineHeight: '22px',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
            }}>
                Deadline: {`${deadlineValue[0]} ${MONTH_VIA_KEY[deadlineValue[1]]} ${deadlineValue[2]}`}
            </Box>
        }
    </Box>
}