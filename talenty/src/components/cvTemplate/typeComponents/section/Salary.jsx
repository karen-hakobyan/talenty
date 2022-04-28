import Select from "../../../shared/Select";

export default function SalaryType({data}) {
    return <Select sx={{width: "90px"}} placeHolder={data?.metadata.placeholder} disabled/>;
}
