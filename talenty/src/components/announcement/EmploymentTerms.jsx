import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function EmploymentTerms({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        isRequired={data.metadata.required}
        Component={
            <Select
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values}
                placeHolder={data.metadata.placeholder}
                textFieldWidth="100%"
                onChange={(event) => {
                    dispatch(changeDialogDataById({id: data.id, value: event.target.value}))
                }}
            />
        }
    />
}


