import { Facebook, Instagram, Linkedine, Twitter } from "../../assets/icons/hrProfile";

let genId = () => Math.random().toString()
export const socialMediaData = [{
        name: "facebook",
        id: genId(),
        link: "",
        plasholder: "Facebook",
        Icon: Facebook,
        open: false
    },
    {
        name: "twitter",
        id: genId(),
        link: "",
        plasholder: "Twitter",
        Icon: Twitter,
        open: false
    },
    {
        name: "linkedine",
        id: genId(),
        link: "",
        plasholder: "Linkedine",
        Icon: Linkedine,
        open: false,
    },
    {
        name: "instagram",
        id: genId(),
        link: "",
        plasholder: "Instagram",
        Icon: Instagram,
        open: false,
    },
]