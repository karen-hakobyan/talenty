import {useState} from "react";
import {useDispatch} from "react-redux";
import {TextField, Box} from "@mui/material";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function Description({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.metadata.required ? <Box>{data.name} *</Box> : data.name}
        Component={
            <TextField
                placeholder={data.metadata.placeholder}
                variant="outlined"
                multiline
                rows={3}
                value={value}
                InputProps={{sx: {
                    height: "40px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px"
                }}}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => dispatch(changeDialogDataById({id: data.id, value}))}
            />
        }
    />
}
