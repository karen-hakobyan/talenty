import {useParams} from "react-router-dom";
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import AnnouncementPreview from "../../dialogs/announcementPreview/AnnouncementPreview";
import {useGetAnnouncementData} from "../hook";

export default function DetailAnnouncement() {
    const {announcementId} = useParams()
    const announcementInfo = useGetAnnouncementData(announcementId)
    return <JobSeekerContainer>
        <AnnouncementPreview viewData={announcementInfo?.jobAnnouncement}/>
        <div>announcement</div>
    </JobSeekerContainer>
}