import {DASHBOARD_ROUTE, HOME_PAGE_ROUTE} from "./routes";

export const HR_ROLE = "ROLE_HR_ADMIN";
export const JOBSEEKER_ROLE = "ROLE_JOB_SEEKER";

export const ROLE_BASE_NAVIGATION = {
    [HR_ROLE]: DASHBOARD_ROUTE,
    [JOBSEEKER_ROLE]: HOME_PAGE_ROUTE,
};
