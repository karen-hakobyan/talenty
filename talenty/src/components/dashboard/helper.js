import {
    AddNewSubItem,
    ApplicationSVG,
    CategorySVG,
    CreateGroupSVG,
    HomeNavSVG,
    NavCreateCVSVG,
    OfferSVG,
    RejectedSVG,
    WorkSVG
} from "../../assets/icons/navigation";

export const getJwt = () => {
    let jwt = localStorage.getItem("jwt");
    if (!jwt) {
        jwt = sessionStorage.getItem("jwt");
    }
    return jwt;
};

export const WIDTH_TRANSITION = "0.5";

export let genId = () => Math.random().toString();

export let navItemsGenerator = [
    {
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
            {text: "Applications", key: genId(), IconComponent: ApplicationSVG},
            {text: "Offer", key: genId(), IconComponent: OfferSVG},
            {text: "Rejected", key: genId(), IconComponent: RejectedSVG},
            {text: "Create Groups", key: genId(), IconComponent: CreateGroupSVG},
        ],
    },
    {
        IconComponent: WorkSVG,
        key: genId(),
        text: "Job announcments",
        children: [],
    },
    {
        IconComponent: NavCreateCVSVG,
        key: genId(),
        text: 'CV template',
        children: [
            {
                text: "Create new Cv", key: genId(), IconComponent: AddNewSubItem, action: (navigate) => {
                    navigate('template')
                }
            }
        ],
    }
];
