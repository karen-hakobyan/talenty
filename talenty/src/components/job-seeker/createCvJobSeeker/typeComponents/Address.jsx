import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import TextField from "../../../../shared/components/Textfield";
import {setTemplateData} from "../../../../store/globalData/slice";
import JobSeekerSubsection from "../JobSeekerSubsection";
import { validate } from "../../../../helpers/validation/validation";

export default function Address({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
             setErr(validate({name:data.name,value,maxLength:data.metadata?.maxLength? data.metadata.maxLength: 20 ,uppercase:true}))
    	},[value,data])
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                InputProps={{
                    sx: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        lineHeight: "24px"
                    }
                }}
                error={err?.error}
                helperText={err.massage}
                placeholder={data.metadata.placeholder}
                sx={{width: '500px'}}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                value={value}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
            />}
    />
}
