import Dashboard from "../components/dashboard";
import { genId } from "../components/dashboard/helper";
import { DASHBOARD_ROUTE } from "../constants/routes";

export let HR_ROUTES = [
  {
    path: `${DASHBOARD_ROUTE}/*`,
    element: <Dashboard />,
    key: genId(),
  },
];
