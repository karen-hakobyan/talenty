import {
    AddNewSubItem,
    ApplicationSVG,
    CategorySVG,
    CreateGroupSVG,
    CurrentJobsSVG,
    HomeNavSVG,
    NavCreateCVSVG,
    OfferSVG,
    PendingSVG,
    RejectedSVG,
    WorkSVG
} from "../../assets/icons/navigation";
import { getTemplateActions, getTemplateById, } from "../../store/globalData/getTemplateActions";

export const getJwt = () => {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) {
        jwt = sessionStorage.getItem("jwt");
    }
    return jwt;
};

export const WIDTH_TRANSITION = "0.5";

export let genId = () => Math.random().toString();

export let navItemsGenerator = (templateList = [], dispatch = () => {}) => ([{
        IconComponent: HomeNavSVG,
        key: genId(),
        text: "Dashboard",
        open: null,
        children: [],
        action: (navigate) => {
            navigate('')
        }
    },
    {
        IconComponent: CategorySVG,
        key: genId(),
        text: "Application List",
        open: false,
        children: [
            { text: "Applications", key: genId(), IconComponent: ApplicationSVG },
            { text: "Offer", key: genId(), IconComponent: OfferSVG },
            { text: "Rejected", key: genId(), IconComponent: RejectedSVG },
            { text: "Create Groups", key: genId(), IconComponent: CreateGroupSVG },
        ],
    },
    {
        IconComponent: WorkSVG,
        key: genId(),
        text: "Job announcement",
        children: [{
                text: "Create announcement",
                key: genId(),
                IconComponent: AddNewSubItem,
                action: (navigate) => {
                    navigate('announcement')
                }
            },
            {
                text: "Pending",
                key: genId(),
                IconComponent: PendingSVG,
                action: (navigate) => {
                    navigate("pending")
                }
            },
            {
                text: "Current jobs",
                key: genId(),
                IconComponent: CurrentJobsSVG,
                action: (navigate) => {
                    navigate("current-jobs")
                }
            }
        ],
    },
    {
        IconComponent: NavCreateCVSVG,
        key: genId(),
        text: 'CV template',
        children: [{
                text: "Create new Cv",
                key: genId(),
                IconComponent: AddNewSubItem,
                action: async(navigate) => {
                    await dispatch(getTemplateActions())
                    navigate('template')
                }
            },
            ...templateList.map(([id, value]) => {
                return {
                    key: id,
                    text: value,
                    action: async(navigate) => {
                        await dispatch(getTemplateById(id))
                        navigate('template')
                    }
                }
            })
        ],
    }
]);

const tableHeder = [{
        key: genId(),
        text: "#",
        IconComponent: true,

    },
    {
        key: genId(),
        text: "Job title",
        IconComponent: true,
    },
    {
        key: genId(),
        text: "Date",
        IconComponent: true,
    },
    {
        key: genId(),
        text: "Location",
        IconComponent: null
    },
    {
        key: genId(),
        text: "Description",
        IconComponent: null,
    },
    {
        key: genId(),
        text: "Statistics",
        IconComponent: null,
    },
    {
        key: genId(),
        text: "Edit",
        IconComponent: null,
    }
]
const tablePendingData = [{
        key: genId(),
        text: "#",
        IconComponent: true,

    },
    {
        key: genId(),
        text: "Job title",
        IconComponent: true,
    },
    {
        key: genId(),
        text: "Date",
        IconComponent: true,
    },
    {
        key: genId(),
        text: "Location",
        IconComponent: null
    },

]
export const pendingDataChange = (data) => {
    return {
        tableBody: data,
        tableHed: tablePendingData
    }
}


export const changeInitialData = (data) => {
    return {
        tableHed: tableHeder,
        tableBody: data,
    }
}