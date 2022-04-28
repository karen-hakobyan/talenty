import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import SubSection from "../../../shared/subSection";
import TextField from "../../../../shared/components/Textfield";
import {setTemplateData} from "../../../../store/globalData/slice";
import { validate } from "../../../../helpers/validation/validation";

export default function Email({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    const [err, setErr]= useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
        setErr(validate({name:data.name,value,maxLength:data.metadata?.maxLength? data.metadata.maxLength: 20 ,isEmail:true}))
   },[value,data.metadata.type,data.metadata?.maxLength,data.name])
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
                placeholder={data.metadata.placeholder}
                sx={{
                    width: '500px',
                }}
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
                error={err?.error}
                helperText={err.massage}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
            />
        }
    />
}
