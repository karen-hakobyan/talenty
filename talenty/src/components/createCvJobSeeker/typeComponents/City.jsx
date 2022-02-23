import SubSection from "../../shared/subSection";
import TextField from "../../../shared/components/Textfield";

export default function City({data}) {
    return <SubSection label={data.name} inputComponent={<TextField sx={{width: '500px'}}/>}/>
}