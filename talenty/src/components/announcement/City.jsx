import {useEffect, useState} from "react";
import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import TextField from "../../shared/components/Textfield";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";
import { validate } from "../../helpers/validation/validation";

export default function City({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    const dispatch = useDispatch()
    useEffect(()=>{
             setErr(validate({name:data.name,value,maxLength:data.metadata.maxLength,uppercase:true}))
    	},[value,data])
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                sx={{width: '100%'}}
                error={err?.error}
                helperText={err.massage}
                value={value}
                onChange={
                    (event) => {
                        setValue(event.target.value)
                    }
                }
                InputProps={{
                    sx: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        lineHeight: "24px"
                    }
                }}
                placeholder={data.metadata.placeholder}
                onBlur={() => {
                    dispatch(changeDialogDataById({id: data.id, value}))
                }}
            />
        }
    />
}
