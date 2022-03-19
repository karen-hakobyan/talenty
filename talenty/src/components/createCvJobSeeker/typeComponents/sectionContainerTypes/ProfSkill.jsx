import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import {setTemplateData} from "../../../../store/globalData/slice";
import Select from "../../../../shared/components/Select";

export default function ProfSkill({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                placeHolder={data.metadata.placeholder}
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values}
                onChange={event => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
            />
        }
    />
}
