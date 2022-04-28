import {useDispatch} from "react-redux";
import {Box, Radio} from "@mui/material";
import {setTemplateData} from "../../../../../store/globalData/slice";

export default function CurrentDate({data}) {
    const dispatch = useDispatch()

    return <Box sx={{display: 'flex', gap: '10px', mt: 2, alignItems: 'center'}}>
        <Radio
            checked={data.metadata.submitted_value === true}
            onClick={() => {
                dispatch(setTemplateData({id: data.id, value: !data.metadata.submitted_value}))
            }}
        />
        <Box
            sx={{fontSize: '16px', lineHeight: '24px', fontWeight: 400, fontFamily: "'Poppins', sans-serif"}}
        >{data.name}</Box>
    </Box>
}
