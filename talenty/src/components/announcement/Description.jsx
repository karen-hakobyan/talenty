import {useState} from "react";
import {useDispatch} from "react-redux";
import {TextField, Box} from "@mui/material";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function Description({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    console.log('simple input')
    return <JobSeekerSubsection
        label={data.metadata.required ? <Box>{data.name} *</Box> : data.name}
        Component={
            <TextField
                placeholder={data?.name}
                variant="outlined"
                multiline
                rows={3}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => dispatch(changeDialogDataById({id: data.id, value}))}
            />
        }
    />
}