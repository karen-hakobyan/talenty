import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {
    Facebook,
    Instagram,
    Linkedine,
    Twitter,
} from "../../assets/icons/hrProfile";
import { isValidPhoneNumber, isValidRationalNumber } from "../../helpers/actions";
import Select from "../../shared/components/Select";
import TextField from "../../shared/components/Textfield";
import { CompanyProfile } from "./CompanyProfile";
import BasicDatePicker from "../shared/DatePicker"
import { MODIFIED_VALUE_STYLE } from "./style";

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
                name: "Founded",
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
    isEditing:false,
    fields: [{
            placeholder: "Product name",
            id: genId(),
            type: "input",
            value: ""
        },
        {
            placeholder: "Product link",
            id: genId(),
            type: "link",
            value: ""
        }
    ]
}]

export const branchSection = [{
    id: genId(),
    isEditing:false,
    fields: [{
            type: "select",
            id: genId(),
            placeholder: "-Country-",
            value: ""
        },
        {
            type: "input",
            id: genId(),
            placeholder: "City",
            value: ""
        },
        {
            type: "number",
            id: genId(),
            placeholder: "Number of employees 100",
            value: ""
        }
    ]
}]
export const newAddSectionInBranches = (section) => {
    return [...section, {
        id: genId(),
        isEditing:false,
        fields: [{
                type: "select",
                id: genId(),
                placeholder: "-Country-",
                value: ""
            },
            {
                type: "input",
                id: genId(),
                placeholder: "City",
                value: ""
            },
            {
                type: "number",
                id: genId(),
                placeholder: "Number of employees 100",
                value: ""
            }
        ]
    }]
}

export const newAddSection = (section) => {
    return [...section, {
        id: genId(),
        isEditing:false,
        fields: [{
                placeholder: "Product name",
                id: genId(),
                value: ""
            },
            {
                placeholder: "Product link",
                id: genId(),
                value: ""
            }
        ]
    }]
}
export const deleteSection = (id, section) => {
    let data;
    data = section.filter(el => el.id !== id)
    return data
}





export function ProfaileTypsComponent({ placeholder, disabled, type, sx, menuItems, ...restProps }) {
    const { data, setData } = useContext(CompanyProfile)
    const [value, setValue] = useState("")
    const [edit, setEdit] = useState(null)
    useEffect(() => {
        if (type === "industry" && data.industry) {
            setValue(data.industry)
        }else if (type === "date" && data.founded) {
            setValue(data.founded)
        }else if (type === "legal_form" && data.legalForm) {
            setValue(data.legalForm)
        }else if (type === "input number" && data.numberOfEmployees) {
            setValue(data.numberOfEmployees)
        }else if (type === "input" && data.address) {
            setValue(data.address)
        }else if (type === "URL" && data.website) {
            setValue(data.website)
        }else if (type === "email" && data.email) {
            setValue(data.email)
        }else if (type === "phone" && data.phoneNumber) {
            setValue(data.phoneNumber)
        }
    }, [data, type])
    useEffect(()=>{
        if(type === "industry" && data.industry){
            setEdit(true)
        }
    },[data.industry,type])
    useEffect(()=>{
       if (type === "date" && data.founded) {
            setEdit(true)
        }
    },[data.founded,type])
    useEffect(()=>{
        if (type === "legal_form" && data.legalForm){
             setEdit(true)
         }
     },[data.legalForm,type])
     useEffect(()=>{
        if (type === "input number" && data.numberOfEmployees) {
             setEdit(true)
         }
     },[data.numberOfEmployees,type])
     useEffect(()=>{
        if (type === "input" && data.address) {
             setEdit(true)
         }
     },[data.address,type])
     useEffect(()=>{
        if (type === "URL" && data.website) {
             setEdit(true)
         }
     },[data.website,type])
     useEffect(()=>{
        if (type === "email" && data.email){
             setEdit(true)
         }
     },[data.email,type])
     useEffect(()=>{
        if (type === "phone" && data.phoneNumber){
             setEdit(true)
         }
     },[data.phoneNumber,type])

    if(edit === null){
        return null
    }
    if(edit){
        return<Box sx={MODIFIED_VALUE_STYLE(type)} onClick={()=>{
            setEdit(false)
        }}>{value}</Box>
    }
    if (type === "industry") {
        return <Select menuItems = { menuItems }
        placeHolder = { placeholder }
        value = { value }
        onBlur = {
            () => {
                setData({
                    ...data,
                    industry: value
                })
                setEdit(true)
            }
        }
        onChange = {
            (e) => {
                setValue(e.target.value)
            }
        }
        fieldStyle = {
            { width: "287px" }
        }
        />}
        if (type === "date") {
            return <BasicDatePicker placeholder = { placeholder }
            value = { value }
            closeAction = {
                (value) => {
                    if (value) {
                        setData({
                            ...data,
                            founded: value
                        })
                        setEdit(true)
                    }
                }
            }
            fieldStyle = {
                { width: "287px" }
            }
            />

        }
        if (type === "legal_form") {
            return <Select menuItems = { menuItems }
            placeHolder = { placeholder }
            value = { value }
            onBlur = {
                () => {
                    setData({
                        ...data,
                        legalForm: value
                    })
                    setEdit(true)
                }
            }
            onChange = {
                (e) => {
                    setValue(e.target.value)
                }
            }
            fieldStyle = {
                { width: "287px" }
            }
            />
        }
        if (type === "input number") {
            return <TextField sx = {
                { width: "287px" }
            }
            value = { value }
            onBlur = {
                () => {
                    setData({
                        ...data,
                        numberOfEmployees: value
                    })
                    setEdit(true)
                }
            }
            onChange = {
                e => {
                    if (isValidRationalNumber(e.target.value)) {
                        setValue(e.target.value)
                    }
                }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "input") {
            return <TextField sx = {
                { width: "287px" }
            }
            value = { value }
            onBlur = {
                () => {
                    setData({
                        ...data,
                        address: value
                    })
                    setEdit(true)
                }
            }
            onChange = {
                (e) => {
                    setValue(e.target.value)
                }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "URL") {
            return <TextField sx = {
                { width: "287px" }
            }
            value = { value }
            onBlur = {
                () => {
                    setData({
                        ...data,
                        website: value
                    })
                    setEdit(true)
                }
            }
            onChange = {
                e => {
                    setValue(e.target.value)
                }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "email") {
            return <TextField sx = {
                { width: "287px" }
            }
            value = { value }
            onBlur = {
                () => {
                    setData({
                        ...data,
                        email: value
                    })
                    setEdit(true)
                }
            }
            onChange = {
                (e) => {
                    setValue(e.target.value)
                }
            }
            placeholder = { placeholder }
            />
        }
        if (type === "phone") {
            return <TextField sx = {
                { width: "287px" }

            }
            value = { value }
            onBlur = {
                () => {
                    if (!value) {
                        setData({
                            ...data,
                            phoneNumber: null
                        })
                    }
                    setData({
                        ...data,
                        phoneNumber: value
                    })
                    setEdit(true)
                }
            }
            onChange = {
                (e) => {
                    if (isValidPhoneNumber(e.target.value)) {
                        setValue(e.target.value)
                    }
                }
            }
            placeholder = { placeholder }
            />
        }
        return ''

    }

    export const takeTheProductsValues = (data) => {
        const valueOfProducts = data.map(el => {
            return {
                productName: el.fields[0].value,
                productLink: el.fields[1].value
            }
        })
        return valueOfProducts.filter(el=>el.productName && el.productLink)
    }
    export const takeTheBranchesValues = (data) => {
        const valueOfBranchis = data.map(el => {
            return {
                country: el.fields[0].value,
                city: el.fields[1].value,
                numberOfEmployees: el.fields[2].value
            }
        })
        return valueOfBranchis.filter(el=>el.country && el.city && el.numberOfEmployees )
    }
    export const completedItems = (data) => {

    }
