import {useEffect, useState} from "react";
import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import TextField from "../../shared/components/Textfield";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";
import { validate } from "./helper";

export default function City({data}) {
    console.log(data)
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        setErr(validate({value,type:data.metadata.type,maxLength:data.metadata.maxLength}))
    },[value,data.metadata.type,data.metadata.maxLength])
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
