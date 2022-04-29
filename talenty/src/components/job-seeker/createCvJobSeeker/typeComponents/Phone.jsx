import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import TextField from "../../../../shared/components/Textfield";
import SubSection from "../../../shared/subSection";
import {setTemplateData} from "../../../../store/globalData/slice";
import {isValidPhoneNumber} from "../../../../helpers/actions";
import { validate } from "../../../../helpers/validation/validation";

export default function Phone({data}) {
    let [value, setValue] = useState(data.metadata.submitted_value || '')
    const [err, setErr]=useState({
        error:true,
        massage:"Not corect URL"
    })
    const dispatch = useDispatch()
    useEffect(()=>{
        setErr(validate({name:data.name,value,maxLength:data.metadata?.maxLength? data.metadata.maxLength: 20,isPhoneNumber:true}))
   },[value,data])
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
                placeholder={data.metadata.placeholder}
                sx={{
                    width: '500px',
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
                onChange={(event) => {
                    if (isValidPhoneNumber(event.target.value)) {
                        setValue(event.target.value)
                    }
                }}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
                // InputProps={{
                //     startAdornment: <Select
                //         menuItems={[]}
                //         onChange={(event) => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
                //         fieldStyle={{
                //             '.MuiOutlinedInput-notchedOutline': {
                //                 border: 'none'
                //             },
                //             width: '44px',
                //         }}
                //     />
                // }}
            />
        }
    />
}
