import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";

export default function SpecialName({data, sx}) {
    return <SubSection label={data.name} inputComponent={<TextField sx={{width: '500px'}} />} sx={sx}/>
}