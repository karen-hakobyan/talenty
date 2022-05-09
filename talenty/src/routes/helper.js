import Dashboard from "../components/dashboard";
import {genId} from "../components/dashboard/helper";
import HomeJobSeeker from "../components/job-seeker/homeJobSeeker";

import {
    ANNOUNCEMENT,
    DASHBOARD_ROUTE,
    HOME_PAGE_ROUTE,
} from "../constants/routes";
import DetailAnnouncement from "../components/job-seeker/search/DetailAnnouncement";

export let HR_ROUTES = [
    {
        path: `${DASHBOARD_ROUTE}/*`,
        element: <Dashboard/>,
        key: genId(),
    },
];

export let JOB_SEEKER_ROUTES = [
    {
        path: `${HOME_PAGE_ROUTE}/*`,
        element: <HomeJobSeeker/>,
        key: genId(),
    },
    {
        path: `${ANNOUNCEMENT}/:announcementId`,
        key: genId(),
        element: <DetailAnnouncement/>,
    }
];
