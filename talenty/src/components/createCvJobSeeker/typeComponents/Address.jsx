import {useDispatch} from "react-redux";
import {useState} from "react";
import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";
import {setTemplateData} from "../../../store/globalData/slice";

export default function Address({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
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