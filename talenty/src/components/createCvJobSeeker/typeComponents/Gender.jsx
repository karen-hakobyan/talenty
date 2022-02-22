import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";

export default function Gender({data}) {
    return <SubSection inputComponent={<TextField select sx={{width: '500px'}} />} label={data.name}/>
}