import Body from "./Body";
import SetIsCompany from "./setIsCompany";
import AnnouncementBody from "./AnnouncementBody";
import AnnouncementPreview from "./announcementPreview/AnnouncementPreview";
import JobSeekerCvPreview from "./job-seeker-preview/JobSeekerCvPreview";

export const dialogTypes = {
    setIsCompany: ({...props} = {}) => ({component: SetIsCompany, props}),
    body: (props) => ({component: Body, props}),
    announcement: (props) => ({component: AnnouncementBody, props}),
    announcementPreview: (props) => ({component: AnnouncementPreview, props}),
    jobSeekerPreview: (props) => ({component: JobSeekerCvPreview, props}),
};

