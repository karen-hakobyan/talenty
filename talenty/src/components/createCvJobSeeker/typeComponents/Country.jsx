import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";

export default function Country({data}) {
    return <SubSection label={data.name} inputComponent={<TextField sx={{width: '500px'}} select/>} />
}