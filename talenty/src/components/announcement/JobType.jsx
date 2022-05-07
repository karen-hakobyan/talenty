import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function JobType({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        isRequired={data.metadata.required}
        Component={
            <Select
                value={data.metadata.submitted_value}
                textFieldWidth="100%"
                menuItems={data.metadata.values}
                placeHolder={data.metadata.placeholder}
                onChange={(event) => {
                    dispatch(changeDialogDataById({id: data.id, value: event.target.value}))
                }}
            />
        }
    />
}
