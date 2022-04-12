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
                sx={{width: '100%'}}

                value={value}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                    }
                }
                InputProps={{sx: {
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px"
                }}}
                placeholder={data.metadata.placeholder}
                onBlur={() => {
                    dispatch(changeDialogDataById({id: data.id, value}))
                }}
            />
        }
    />
}
