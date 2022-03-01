import {useDispatch} from "react-redux";
import TextField from "../../../shared/components/Textfield";
import SubSection from "../../shared/subSection";
import {MenuItem} from "@mui/material";
import {setTemplateData} from "../../../store/globalData/slice";


export default function Gender({data}) {
    const dispatch = useDispatch()
    return <SubSection
        inputComponent={
            <TextField
                select
                sx={{width: '500px'}}
                value={data.metadata.submitted_value}
                onChange={(event) => {
                    dispatch(setTemplateData({id: data.id, value: event.target.value}))
                }}
            >
                {data.metadata?.values.map((el, index) => {
                    return <MenuItem value={el} key={index}>{el}</MenuItem>
                })}
            </TextField>
        }
        label={data.name}
    />
}