import {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import TextField from "../../shared/components/Textfield";
import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";
import {selectDialogData} from "../../store/dialogs/selector";
import BasicDatePicker from "../shared/DatePicker";
import { validate } from "../../helpers/validation/validation";

export default function Title({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    const dialogData = useSelector(selectDialogData)
    const deadline = useMemo(() => {
        return dialogData.fields.find(el => el.name === 'Deadline')
    }, [dialogData])
    useEffect(()=>{
            setErr(validate({name:data.name,value,maxLength:data.metadata.maxLength,uppercase:true}))
    },[value,data])
    return <Box sx={{display: 'flex', gap: '35px'}}>
        <JobSeekerSubsection
            label={"Title"}
            sx={{flex: 1}}
            isRequired={data.metadata.required}
            Component={
                <TextField
                    placeholder={data.metadata.placeholder}
                    sx={{width: '100%'}} 
                    value={value}
                    error={err?.error}
                    helperText={err.massage}
                    InputProps={{
                        sx: {
                            height: "40px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "16px",
                            lineHeight: "24px"
                        }
                    }}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => dispatch(changeDialogDataById({id: data.id, value}))}
                />
            }
        />
        <JobSeekerSubsection
            label={deadline.name}
            isRequired={data.metadata.required}
            Component={
                <BasicDatePicker
                    placeholder={deadline.metadata.placeholder}
                    value={deadline.metadata.submitted_value}
                    closeAction={(value) => {
                        if(value){
                            dispatch(changeDialogDataById({
                                id: deadline.id,
                                value
                            }))
                        }
                    }}
                    pickerProps={{minDate: new Date()}}
                    fieldStyle={{width: '320px'}}
                />
            }
        />
    </Box>

}
