import {useState} from "react";
import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../store/globalData/slice";
import BasicDatePicker from "../../shared/DatePicker";

export default function Date({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <BasicDatePicker
                {...{value}}
                onChange={
                    (event) => dispatch(setTemplateData({
                        id: data.id,
                        value: event.target.value
                    }))
                }
                fieldStyle={{width: '500px'}}
            />
        }
    />
}