import {useDispatch} from "react-redux";
import {setTemplateData} from "../../../../store/globalData/slice";
import BasicDatePicker from "../../../shared/DatePicker";
import {useEffect} from "react";

export default function DateSubSection({data, extra}) {
    const dispatch = useDispatch()
    useEffect(() => {
        if(extra && extra.metadata.submitted_value && data.metadata.submitted_value) {
            dispatch(setTemplateData({
                id: data.id,
                value: undefined,
            }))
        }
    },[extra, dispatch])
    return <BasicDatePicker
        value={data.metadata.submitted_value}
        onChange={
            (event) => dispatch(setTemplateData({
                id: data.id,
                value: event.toDateString()
            }))
        }
        fieldStyle={{width: '242px'}}
        pickerProps={
            extra ? {disabled: extra.metadata.submitted_value} : {}
        }
    />
}