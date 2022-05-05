import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../../store/globalData/slice";
import BasicDatePicker from "../../../shared/DatePicker";


export default function Date({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <BasicDatePicker
                placeholder={data.metadata.placeholder}
                value={data.metadata.submitted_value}
                closeAction={(value) => {
                    if(value){
                        dispatch(setTemplateData({
                            id: data.id,
                            value
                        }))
                    }
                }}
                fieldStyle={{width: '500px'}}
            />
        }
    />
}
