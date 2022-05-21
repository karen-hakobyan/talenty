import {
  Facebook,
  Instagram,
  Linkedine,
  Twitter,
} from "../../assets/icons/hrProfile";

let genId = () => Math.random().toString();
export const socialMediaData = [
  {
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
const body = {
  bodyDetails: {
    name: "Details",
    fields: [
      {
        name: "Legal Form",
        type: "select",
        id: genId(),
        placeholder: "-Select-",
      },
      {
        name: "Industry",
        type: "select",
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
  bodyContacts: {
    name: "Contacts",
    fields: [
      {
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
        type: "input",
        id: genId(),
        placeholder: "Email",
      },
      {
        name: "Website",
        type: "input",
        id: genId(),
        placeholder: "Website",
      },
    ],
  },
};
