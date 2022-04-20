import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box} from "@mui/material";
import TextField from "../../shared/components/Textfield";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {changeDialogDataById} from "../../store/dialogs/slice";
import {selectDialogData} from "../../store/dialogs/selector";
import BasicDatePicker from "../shared/DatePicker";
import {ReactComponent as RequiredSVG} from "../../assets/icons/required.svg";

export default function Title({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    const dialogData = useSelector(selectDialogData)
    const deadline = useMemo(() => {
        return dialogData.fields.find(el => el.name === 'Deadline')
    }, [dialogData])
    return <Box sx={{display: 'flex', gap: '35px'}}>
        <JobSeekerSubsection
            label={<Box>Title <RequiredSVG style={{marginBottom: '10px'}}/></Box>}
            sx={{flex: 1}}
            Component={
                <TextField
                    placeholder={data.metadata.placeholder}
                    sx={{width: '100%'}} value={value}
                    InputProps={{
                        sx: {
                            height: "40px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "16px",
                            lineHeight: "24px"
                        }
                    }}
                    onChange={(event) => setValue(event.target.value)}
                    onBlur={() => dispatch(changeDialogDataById({id: data.id, value}))}
                />
            }
        />
        <JobSeekerSubsection
            label={<Box>{deadline.name} <RequiredSVG style={{marginBottom: '10px'}}/></Box>}
            Component={
                <BasicDatePicker
                    placeholder="Deadline"
                    value={deadline.metadata.submitted_value}
                    closeAction={(value) => {
                        dispatch(changeDialogDataById({
                            id: deadline.id,
                            value
                        }))
                    }}
                    pickerProps={{minDate: new Date()}}
                    fieldStyle={{width: '320px'}}
                />
            }
        />
    </Box>

}
