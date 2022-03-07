import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../store/globalData/slice";
import BasicDatePicker from "../../shared/DatePicker";
import {validateDate} from "./sectionContainerTypes/DateSubSection";

export default function Date({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <BasicDatePicker
                value={data.metadata.submitted_value}
                onChange={
                    (event) => {
                        dispatch(setTemplateData({
                            id: data.id,
                            value: validateDate(event.toLocaleDateString()),
                        }))
                    }
                }
                fieldStyle={{width: '500px'}}
            />
        }
    />
}
