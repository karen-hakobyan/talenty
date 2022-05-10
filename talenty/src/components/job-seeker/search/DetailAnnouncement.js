import {useParams} from "react-router-dom";
import {Box} from '@mui/material'
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import AnnouncementPreview from "../../dialogs/announcementPreview/AnnouncementPreview";
import {useGetAnnouncementData} from "../hook";
import Button from "../../../shared/components/Button";
import {TEMPLATE_BUTTON_CREATE} from "../../../shared/styles";

export default function DetailAnnouncement() {
    const {announcementId} = useParams()
    const announcementInfo = useGetAnnouncementData(announcementId)
    console.log(announcementInfo)
    return <JobSeekerContainer>
        <Box sx={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
            <AnnouncementPreview viewData={announcementInfo?.jobAnnouncement}/>
            <Button sx={{...TEMPLATE_BUTTON_CREATE, width: '179px'}}>APPLY NOW</Button>
        </Box>
    </JobSeekerContainer>
}