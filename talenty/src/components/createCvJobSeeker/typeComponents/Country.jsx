import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";
import {useDispatch} from "react-redux";
import {MenuItem} from "@mui/material";
import {setTemplateData} from "../../../store/globalData/slice";

export default function Country({data}) {
    const dispatch = useDispatch()
    return <SubSection
        label={data.name}
        inputComponent={
            <TextField
                sx={{width: '500px'}}
                select
                value={data.metadata.submitted_value}
                onChange={(event) => dispatch(setTemplateData({id: data.id, value: event.target.value}))}
            >
                {data.metadata.values?.map((el, index) => {
                    return <MenuItem key={index} value={el}>{el}</MenuItem>
                })}
            </TextField>
        }
    />
}