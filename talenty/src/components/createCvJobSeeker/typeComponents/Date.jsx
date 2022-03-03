import {useState} from "react";
import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../store/globalData/slice";
import BasicDatePicker from "../../shared/DatePicker";

export default function Date({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <BasicDatePicker
                value={data.metadata.submitted_value}
                onChange={
                    (event) => {
                        // console.log(event.toString())
                        console.log(event.toDateString())
                        dispatch(setTemplateData({
                            id: data.id,
                            value: event.toDateString(),
                        }))
                    }
                }
                fieldStyle={{width: '500px'}}
            />
        }
    />
}