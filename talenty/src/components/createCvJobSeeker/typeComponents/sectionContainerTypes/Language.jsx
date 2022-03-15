import {useDispatch} from "react-redux";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import Select from "../../../../shared/components/Select";
import {COUNTRY_NAMES_LANGUAGE} from "../../../../helpers/country";
import {setTemplateData} from "../../../../store/globalData/slice";

export default function Language({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                value={data.metadata.submitted_value}
                menuItems={COUNTRY_NAMES_LANGUAGE}
                onChange={(event) => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
            />
        }
    />
}
