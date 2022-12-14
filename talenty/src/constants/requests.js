import axios from "axios";
import { getJwt } from "../components/dashboard/helper";
// const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:7800/";
export const baseUrl = "https://api.talenty.duckdns.org";
// export const baseUrl = "http://localhost:7800/";

export const instance = axios.create({
    baseURL: baseUrl,
});
instance.interceptors.request.use(function(config) {
    let temp = {...config };
    if (getJwt()) {
        temp = {
            ...temp,
            headers: { Authorization: `Bearer ${getJwt()}` },
        };
    }
    return temp;
});

export const GET_TEMPLATES = `/cv_template/system`;
export const POST_SIGN_UP_HR = `/register/hr`;
export const POST_SIGN_UP_JOB_SEEKER = `/register/jobseeker`;
export const All_TEMPLATES = "/cv_template/all";
export const TEMPLATE_BY_ID = (id) => `/cv_template?id=${id}`;
export const GET_EDITED_USER_CV = (id) => `/cv_template/submitted?id=${id}`;
export const LOGIN = `/login`;
export const getForgotPassword = (email) => {
    return `/reset/password?email=${email}`;
};
export const getValidateToken = (token) => {
    return `/token?token=${token}`;
};
export const postChangePassword = (token) => `/reset/password?token=${token}`;
export const getConfirmUser = (token) => `/confirm?token=${token}`;
export const getDeleteHrCvId = (id) => `/cv_template/delete?id=${id}`;
export const GET_CONFIRM_ANNOUCEMENT = `/job_announcements/all_confirmed`;
export const GET_PENDINGS_ANNOUCEMENT = `/job_announcements/all_pending`;
export const GET_CONFIRMED_JOB_ANNOUNCEMENTS =
    "/job_announcements/temp_all_confirmed";
export const GET_JOB_ANNOUNCEMENTS_FILTER =
    "/job_announcements/find_by_filters";
// export const GET_JOB_ANNOUNCEMENTS_FILTER = 'find_by_filters'
export const ANNOUNCEMENT_FILTER_LIST = "/job_announcements/get_filters_list";
export const ANNOUNCEMENT_VIEW_MORE = "/job_announcements/view_more";
export const JOB_SEEKER_APPLY_ANNOUNCEMENT = "/job_announcements/apply";
export const GET_SELECT_LIST = "/company/get_dropdown_list";
export const GET_USER_INFO = "/job_seeker/profile_details";
export const POST_UPDATE_HEADLINE = "/job_seeker/update_headline";
export const POST_PROFILR_STATUS = "/job_seeker/update_profile_status"
    // body:{ownerId,jobAnnouncementId, submittedCvTemplateId}
export const JOB_SEEKER_APPLY_IN_PROGRESS = '/job_announcements/apply_in_progress'
export const GET_COMPANY_INFO = "/company/get"
export const POST_UPDATE_COPMANY_PROFILE_INFO = "/company/update"