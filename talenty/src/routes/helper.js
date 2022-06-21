import { Box } from "@mui/material";
import Dashboard from "../components/dashboard";
import Header from "../components/dashboard/Header";
import { genId } from "../components/dashboard/helper";
import ProfileOfCompany from "../components/hrProfaile/CompanyProfile";

import HomeJobSeeker from "../components/job-seeker/homeJobSeeker";

import {
    DASHBOARD_ROUTE,
    HOME_PAGE_ROUTE,
    JOBSEEKER_PROFILE_ROUTE,
} from "../constants/routes";

export let HR_ROUTES = [{
        path: `${DASHBOARD_ROUTE}/*`,
        element: < Dashboard /> ,
        key: genId(),

    },
    {
        path: `${JOBSEEKER_PROFILE_ROUTE}`,
        element: <Box>
            <Header/>
            <ProfileOfCompany />
        </Box> ,
        key: genId(),
    }
];

export let JOB_SEEKER_ROUTES = [{
        path: `${HOME_PAGE_ROUTE}/*`,
        element: < HomeJobSeeker /> ,
        key: genId(),
    },
    // {
    //     path: `${ANNOUNCEMENT}/:announcementId`,
    //     key: genId(),
    //     element: <DetailAnnouncement/>,
    // }
];
