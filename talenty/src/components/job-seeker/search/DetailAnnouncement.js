import {useParams} from "react-router-dom";
import JobSeekerContainer from "../../shared/JobSeekerContainer";

export default function DetailAnnouncement() {
    const params = useParams()
    console.log(params)
    return <JobSeekerContainer>
        <div>announcement</div>
    </JobSeekerContainer>
}