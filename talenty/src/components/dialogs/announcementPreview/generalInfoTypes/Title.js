import {Box} from "@mui/material";
import {MONTH_VIA_KEY} from "../../../../constants/date";
import Button from "../../../../shared/components/Button";
import {TEMPLATE_BUTTON_CREATE} from "../../../../shared/styles";

export default function Title({generalInfoData, data, isApplying}) {
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
            lineHeight: '36px',
            color: '#5D00A6',
            letterSpacing: '0.02em',
        }}>{data.metadata.submitted_value}</Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {
                isApplying && <Button sx={TEMPLATE_BUTTON_CREATE} onClick={() => {
                }}>APPLY NOW</Button>
            }
            {
                deadline.metadata.submitted_value &&
                <Box sx={{
                    color: '#FF0000',
                    fontSize: '20px',
                    lineHeight: '22px',
                    fontFamily: "Poppins",
                    fontWeight: 700,
                }}>
                    Deadline: {`${deadlineValue[0]} ${MONTH_VIA_KEY[deadlineValue[1]]} ${deadlineValue[2]}`}
                </Box>
            }
        </Box>
    </Box>
}
