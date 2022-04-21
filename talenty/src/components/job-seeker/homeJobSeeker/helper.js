import {genId} from "../../dashboard/helper";

export const SUB_ROUTES_GENERATOR = [{
    key: genId(),
    name: "Home",
    path: "",
    active: false,
},
    {
        key: genId(),
        name: "Search",
        path: "search",
        active: false,
    },
    {
        key: genId(),
        name: "Jobs",
        path: "jobs",
        active: false,
    },
];