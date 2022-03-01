import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import RoundedCheckbox from "../../../../shared/components/RoundedCheckbox";
import {setTemplateData} from "../../../../store/globalData/slice";

export default function CurrentDate({data}) {
    const dispatch = useDispatch()

    return <Box sx={{display: 'flex', gap: '10px', mt: 2, alignItems: 'center'}}>
        <RoundedCheckbox
            onChange={() => {
                dispatch(setTemplateData({id: data.id, value: !data.metadata.submitted_value}))
            }}
            checked={data.metadata.submitted_value || false}
        />
        <Box
            sx={{fontSize: '16px', lineHeight: '24px', fontWeight: 400, fontFamily: 'Proxima Nova'}}
        >Still studying</Box>
    </Box>
}