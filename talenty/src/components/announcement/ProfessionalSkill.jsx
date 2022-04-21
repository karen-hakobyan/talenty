import {useState} from "react";
import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import {useDispatch} from "react-redux";
import {MultipleSelect} from "../../shared/components/Select";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function ProfessionalSkill({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value)

    return <JobSeekerSubsection
        label={data.name}
        Component={
            <MultipleSelect
                menuItems={data.metadata.values || ['1', '2', '3']}
                value={value ? value.split('$$') : []}
                placeHolder={data.metadata.placeholder}
                textFieldWidth='100%'
                onChange={(event) => {
                    if (event.target.value.length === new Set(event.target.value).size) {
                        setValue(event.target.value.join('$$'))
                    }
                }}
                selectProps={{
                    onClose: () => {
                        dispatch(changeDialogDataById({id: data.id, value}))
                    }
                }}
            />
        }
    />
}
