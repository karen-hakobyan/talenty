import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, TextField} from "@mui/material";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";
import {DeleteIcon} from "../../assets/icons/jobseeker";
import {onDelete} from "../../helpers/dialog";
import {selectDialogData} from "../../store/dialogs/selector";

export default function Description({data}) {
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dispatch = useDispatch()
    const dialogData = useSelector(selectDialogData);
    const id = data.id
    return <JobSeekerSubsection
        label={<Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
        }}><Box>{data.metadata.required ? <Box>{data.name} *</Box> : data.name}</Box>
            {data.metadata.deletable ? (
                <Box
                    sx={{
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        onDelete({dialogData, id, dispatch})
                    }}
                >{<DeleteIcon/>}</Box>) : null}</Box>}
        Component={
            <TextField
                placeholder={data.metadata.placeholder}
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
