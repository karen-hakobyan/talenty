import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import { validate, validetionType } from "../../../../helpers/validation/validation";
import TextField from "../../../../shared/components/Textfield";
import {setTemplateData} from "../../../../store/globalData/slice";
import JobSeekerSubsection from "../JobSeekerSubsection";


export default function SpecialName({data, sx = {}, fieldStyle = {}}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
        setErr(validate({
            name:data.name,
            value,
            maxLength:data.metadata?.maxLength? data.metadata.maxLength: 20,
            uppercase:validetionType(validetionType)
        }))
   },[value,data])

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
                error={err?.error}
                helperText={err.massage}
                FormHelperTextProps={{
                    sx:{fontFamily: "'Poppins', sans-serif"}
                }}
                InputProps={{
                    sx: {
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "16px",
                        lineHeight: "24px"
                    }
                }}
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
