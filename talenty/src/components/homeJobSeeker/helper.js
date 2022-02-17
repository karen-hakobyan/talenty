import {genId} from "../dashboard/helper";

export const SUB_ROUTES_GENERATOR = [
    {
        key: genId(),
        name: "Home",
        path: "",
    },
    {
        key: genId(),
        name: "Search",
        path: "search",
    },
    {
        key: genId(),
        name: "Jobs",
        path: "jobs",
    },
];
