import {useState} from "react";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import TextField from "../../shared/components/Textfield";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function City({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                placeholder={data.metadata.placeholder}
                sx={{width: '320px'}}
                value={value}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                    }
                }
                onBlur={() => {
                    dispatch(changeDialogDataById({id: data.id, value}))
                }}
            />
        }
    />
}
