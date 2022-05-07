import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";
import {COUNTRY_NAMES} from "../../helpers/country";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function Country({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        isRequired={data.metadata.required}
        Component={
            <Select
                placeHolder={data.metadata.placeholder}
                value={data.metadata.submitted_value}
                textFieldWidth="100%"
                menuItems={COUNTRY_NAMES}
                onChange={(event => dispatch(changeDialogDataById({id: data.id, value: event.target.value})))}
            />
        }
    />
}
