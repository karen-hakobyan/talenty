import Dashboard from "../components/dashboard";
import { genId } from "../components/dashboard/helper";
import RoleNotFoundRoute from "../components/notMatchRoute/RoleNotFoundRoute";
import { DASHBOARD_ROUTE, HOME_PAGE_ROUTE } from "../constants/routes";

export let HR_ROUTES = [
  {
    path: `${DASHBOARD_ROUTE}/*`,
    element: <Dashboard />,
    key: genId(),
  },
];

export let JOBSEEKER_ROUTES = [
  {
    path: HOME_PAGE_ROUTE,
    element: <h1>Talenty !!!</h1>,
    key: genId(),
  },
];

export let DEFAULT_ROUTES = [...JOBSEEKER_ROUTES, ...HR_ROUTES].map((el) => ({
  ...el,
  element: <RoleNotFoundRoute />,
}));
