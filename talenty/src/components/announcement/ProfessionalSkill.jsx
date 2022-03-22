import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";
import {useDispatch} from "react-redux";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function ProfessionalSkill({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select

                menuItems={data.metadata.values || [1, 2, 3]}
                value={[data.metadata.submitted_value]}
                placeHolder={data.metadata.placeholder}
                textFieldWidth='100%'
                selectProps={{
                    multiple: true, renderValue: (value) => {
                        return value.join(',')
                    }
                }}
                onChange={(event) => {
                    dispatch(changeDialogDataById({
                        id: data.id,
                        value: [...(data.metadata.submitted_value || []), event.target.value]
                    }))
                }}
            />
        }
    />
}
