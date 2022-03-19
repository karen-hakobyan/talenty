import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../JobSeekerSubsection";
import Select from "../../../shared/components/Select";
import {COUNTRY_NAMES} from "../../../helpers/country";
import {setTemplateData} from "../../../store/globalData/slice";

export default function Country({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                placeHolder={data.metadata.placeholder}
                value={data.metadata.submitted_value}
                menuItems={COUNTRY_NAMES}
                onChange={(event) => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
            />
        }
    />
}
