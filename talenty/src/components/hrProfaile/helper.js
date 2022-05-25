import {
    Facebook,
    Instagram,
    Linkedine,
    Twitter,
} from "../../assets/icons/hrProfile";
import Select from "../../shared/components/Select";
import TextField from "../../shared/components/Textfield";
import { MAIN_PURPLE } from "../../style/colors";
import BasicDatePicker from "../shared/DatePicker"

let genId = () => Math.random().toString();
export const socialMediaData = [{
        name: "facebook",
        id: genId(),
        link: "",
        placeholder: "Facebook",
        Icon: Facebook,
        open: false,
    },
    {
        name: "twitter",
        id: genId(),
        link: "",
        placeholder: "Twitter",
        Icon: Twitter,
        open: false,
    },
    {
        name: "linkedine",
        id: genId(),
        link: "",
        placeholder: "Linkedine",
        Icon: Linkedine,
        open: false,
    },
    {
        name: "instagram",
        id: genId(),
        link: "",
        placeholder: "Instagram",
        Icon: Instagram,
        open: false,
    },
];
export const body = [{
        name: "Details",
        id: genId(),
        fields: [{
                name: "Legal Form",
                type: "legal_form",
                id: genId(),
                placeholder: "-Select-",
            },
            {
                name: "Industry",
                type: "industry",
                id: genId(),
                placeholder: "-Select-",
            },
            {
                name: "Industry",
                type: "date",
                id: genId(),
                placeholder: "",
            },
            {
                name: "Number of  employees",
                type: "input number",
                id: genId(),
                placeholder: "",
            },
        ],
    },
    {
        name: "Contacts",
        id: genId(),
        fields: [{
                name: "Address",
                type: "input",
                id: genId(),
                placeholder: "Address",
            },
            {
                name: "Phone",
                type: "phone",
                id: genId(),
                placeholder: "+374 77 123 456",
            },
            {
                name: "Email",
                type: "email",
                id: genId(),
                placeholder: "Email",
            },
            {
                name: "Website",
                type: "URL",
                id: genId(),
                placeholder: "Website",
            },
        ],
    },
];
export const productsSection = [{
    id: genId(),
    fields: [{
            placeholder: "Product name",
            id: genId()
        },
        {
            placeholder: "Product link",
            id: genId()
        }
    ]
}]
export const newProductsSection = () => {
    productsSection.push({
        id: genId(),
        fields: [{
                placeholder: "Product name",
                id: genId()
            },
            {
                placeholder: "Product link",
                id: genId()
            }
        ]
    })
    return productsSection
}
export const deleteSection = (id) => {
    let data;
    data = productsSection.filter(el => el.id !== id)
    return data
}





export function ProfaileTypsComponent({ placeholder, disabled, type, sx, menuItems, ...restProps }) {
    console.log(type)

    if (type === "industry" || type === "legal_form") {
        return <Select menuItems = { menuItems }
        placeHolder = { placeholder }
        fieldStyle = {
            { width: "287px" }
        }
        />}
        if (type === "date") {
            return <BasicDatePicker placeholder = { placeholder }
            fieldStyle = {
                { width: "287px" }
            }
            />

        }
        if (type === "input number") {
            return <TextField sx = {
                { width: "287px" }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "input") {
            return <TextField sx = {
                { width: "287px" }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "URL") {
            return <TextField sx = {
                { width: "287px" }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "email") {
            return <TextField sx = {
                { width: "287px" }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "phone") {
            return <TextField sx = {
                { width: "287px" }
            }
            placeholder = { placeholder }
            />
        }
        return ''

    }