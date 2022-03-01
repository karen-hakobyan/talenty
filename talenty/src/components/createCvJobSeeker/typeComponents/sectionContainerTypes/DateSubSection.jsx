import TextField from "../../../../shared/components/Textfield";
import {useDispatch} from "react-redux";
import {setTemplateData} from "../../../../store/globalData/slice";

export default function DateSubSection({data}) {
    const dispatch = useDispatch()
    return <TextField
        type="date"
        sx={{width: '242px'}}
        value={data.metadata.submitted_value}
        onChange={(event) => {
            dispatch(setTemplateData({
                id: data.id,
                value: event.target.value,
            }))
        }}
    />
}