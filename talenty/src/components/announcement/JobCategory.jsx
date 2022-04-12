import Select from "../../shared/components/Select";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function JobCategory({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                value={data.metadata.submitted_value}
                textFieldWidth="100%"
                InputProps={{sx: {
                    height: "40px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px"
                }}}
                menuItems={data.metadata.values}
                placeHolder={data.metadata.placeholder}
                onChange={(event) => {
                    dispatch(changeDialogDataById(({id: data.id, value: event.target.value})))
                }}
            />
        }
    />
}
