import { ArrowTable } from "../../assets/icons/table";
import { genId } from "../dashboard/helper";

const tableHeder = [{
        key: genId(),
        text: "#",
        IconComponent: ArrowTable,
    },
    {
        key: genId(),
        text: "Job title",
        IconComponent: ArrowTable,
    },
    {
        key: genId(),
        text: "Date",
        IconComponent: ArrowTable,
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