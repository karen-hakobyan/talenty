import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";

export default function Phone({data}) {
    return <SubSection label={data.name} inputComponent={<TextField sx={{width: '500px'}} />} />
}