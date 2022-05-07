import {useParams} from "react-router-dom";

export default function DetailAnnouncement() {
    const {announcementId} = useParams()
    console.log(announcementId)
    return <div>announcement</div>
}