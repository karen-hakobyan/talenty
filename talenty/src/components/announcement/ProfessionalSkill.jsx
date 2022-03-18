import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import Select from "../../shared/components/Select";
import {useDispatch} from "react-redux";
import {setTemplateData} from "../../store/globalData/slice";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function ProfessionalSkill({data}) {
    console.log(data)
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Select
                menuItems={data.metadata.values || []}
                value={data.metadata.submitted_value}
                placeHolder="Skill name"
                textFieldWidth='100%'
                multiple
                onChange={(event) => {
                    dispatch(changeDialogDataById({id: data.id, value: event.target.value}))
                }}
            />
        }
    />
}