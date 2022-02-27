import React, {useState} from "react";
import {useDispatch} from "react-redux";
import SubSection from "../../shared/subSection";
import TextField from "../../../shared/components/Textfield";
import {setTemplateData} from "../../../store/globalData/slice";

export default function Email({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
                sx={{width: '500px'}}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onBlur={() => {
                    dispatch(setTemplateData({id: data.id, value}))
                }}
            />
        }
    />
}