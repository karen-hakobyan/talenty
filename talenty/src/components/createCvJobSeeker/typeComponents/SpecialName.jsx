import TextField from "../../../shared/components/Textfield";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setTemplateData} from "../../../store/globalData/slice";
import JobSeekerSubsection from "../JobSeekerSubsection";

export default function SpecialName({data, sx = {}, fieldStyle = {}}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                placeholder={data.metadata.placeholder}
                sx={
                    {
                        width: '500px', ...fieldStyle,
                    }
                }
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                value={value}
                disabled={!!data.metadata.autocomplete}
                onBlur={() => {
                    setTimeout(() => {
                        dispatch(setTemplateData({id: data.id, value}))
                    }, 110)
                }}
                {...(data.name ? {} : {placeholder: 'URL'})}
            />}
        sx={sx}
    />
}
