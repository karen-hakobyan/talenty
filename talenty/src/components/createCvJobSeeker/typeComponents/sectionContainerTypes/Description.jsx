import {useState} from "react";
import {useDispatch} from "react-redux";
import {TextField} from "@mui/material";
import JobSeekerSubsection from "../../JobSeekerSubsection";
import {setTemplateData} from "../../../../store/globalData/slice";

export default function Description({data}) {
    const dispatch = useDispatch()
    const [value, setValue] = useState(data.metadata.submitted_value || '')
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <TextField
                placeholder={data.metadata.placeholder}
                variant="outlined"
                multiline
                rows={4}
                value={value}
                InputProps={{sx: {
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "16px",
                    lineHeight: "24px"
                }}}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => {
                    setTimeout(() => {
                        dispatch(setTemplateData({id: data.id, value}))
                    }, 100)
                }}
            />
        }
    />
}
