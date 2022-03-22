import {useState} from "react";
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import TextField from "../../shared/components/Textfield";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";

export default function Title({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <Box>
        <JobSeekerSubsection
            label={<Box>Title <span style={{color: '#8C0DF0'}}>*</span></Box>}
            Component={
                <TextField
                    placeholder={data.metadata.placeholder}
                    sx={{width: '100%'}} value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => dispatch(changeDialogDataById({id: data.id, value}))}
                />
            }
        />
    </Box>
}
