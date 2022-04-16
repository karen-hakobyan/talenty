import {useDispatch} from "react-redux";
import {setTemplateData} from "../../../../store/globalData/slice";
import BasicDatePicker from "../../../shared/DatePicker";
import {useEffect} from "react";

export default function DateSubSection({data, extra}) {
    const dispatch = useDispatch()
    useEffect(() => {
        if (extra && extra.metadata.submitted_value && data.metadata.submitted_value) {
            dispatch(setTemplateData({
                id: data.id,
                value: undefined,
            }))
        }
    }, [extra, dispatch, data])

    return <BasicDatePicker
        placeholder={data.metadata.placeholder}
        value={data.metadata.submitted_value}
        closeAction={(value) => {
            dispatch(setTemplateData({
                id: data.id,
                value
            }))
        }}
        fieldStyle={{width: '242px'}}
        pickerProps={
            extra ? {disabled: !!extra.metadata.submitted_value} : {}
        }
    />
}

export function validateDate(date) {
    let result = date.split('/')
    let temp = result[0]
    result[0] = result[1]
    result[1] = temp
    return result.map(el => el.length === 1 ? '0' + el : el).join('/')
}

export function changeDateFormat(date) {
    let result = date.split('/')
    let temp = result[0]
    result[0] = result[1]
    result[1] = temp
    return result.join('/')
}
