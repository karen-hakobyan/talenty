import {Box} from "@mui/material";
import Button from "../../../../shared/components/Button";
import {DetailAnnouncementContext} from "../../../job-seeker/search/DetailAnnouncement";
import {MONTH_VIA_KEY} from "../../../../constants/date";
import {TEMPLATE_BUTTON_CREATE} from "../../../../shared/styles";
import {applyInProgress} from "../../../job-seeker/request";
import {useDestructureContext} from "../../../../hooks/mainHooks";

export default function Title({generalInfoData, data}) {
    let deadline = generalInfoData.fields.find(el => el.name === 'Deadline')
    const {
        viewData: isApplying,
        setOpen,
        announcementId,
        setHrCvId,
        setIsMatched
    } = useDestructureContext(DetailAnnouncementContext)
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
                isApplying && <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        sx={{...TEMPLATE_BUTTON_CREATE, width: '179px'}}
                        onClick={() => {
                            applyInProgress(setOpen, announcementId, setHrCvId, setIsMatched)
                        }}
                    >
                        APPLY NOW</Button>
                </Box>
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
