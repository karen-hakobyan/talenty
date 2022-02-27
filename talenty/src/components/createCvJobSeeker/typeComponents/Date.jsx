import {useState} from "react";
import {useDispatch} from "react-redux";
import TextField from "../../../shared/components/Textfield";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../store/globalData/slice";

export default function Date({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                value={value}
                type="date"
                sx={{width: '500px'}}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
            />
        }
    />
}