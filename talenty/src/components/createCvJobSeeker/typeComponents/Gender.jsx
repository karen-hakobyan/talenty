import {useDispatch} from "react-redux";
import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";
import {MenuItem} from "@mui/material";
import {setTemplateData} from "../../../store/globalData/slice";
import JobSeekerSubsection from "../JobSeekerSubsection";
import Select from "../../../shared/components/Select";


export default function Gender({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        Component={
            <Select
                value={data.metadata.submitted_value}
                menuItems={data.metadata.values}
                onChange={(event) => {
                    dispatch(setTemplateData({id: data.id, value: event.target.value}))
                }}
            />
        }
        label={data.name}
    />
}