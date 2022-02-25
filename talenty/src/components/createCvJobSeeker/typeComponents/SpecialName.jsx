import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";
import {useState} from "react";

export default function SpecialName({data, sx = {}}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
                sx={{width: '500px'}}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                value={value}
            />}
        sx={sx}
    />
}