import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import TextField from "../../../../shared/components/Textfield";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../../store/globalData/slice";
import { validate } from "../../../../helpers/validation/validation";

export default function City({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
             setErr(validate({name:data.name,value,maxLength:data.metadata?.maxLength? data.metadata.maxLength: 20 ,uppercase:true}))
    	},[value,data.metadata.type,data.metadata?.maxLength,data.name])
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                placeholder={data.metadata.placeholder}
                value={value}
                name={data.name}
                error={err?.error}
                helperText={err.massage}
                FormHelperTextProps={{
                    sx:{fontFamily: "'Poppins', sans-serif"}
                }}
                InputProps={{
                    sx: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        lineHeight: "24px",
                        "&  .MuiFormHelperText-root.Mui-error":{
                            fontFamily: "'Poppins', sans-serif",
                        }
                    }
                }}
                sx={{width: '500px'}}
                onChange={(e) => {
                    setValue(e.target.value)
                }}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
            />
        }
    />
}
