import {Box} from "@mui/material";
import RoundedCheckbox from "../../../../shared/components/RoundedCheckbox";

export default function CurrentDate({data}) {
    return <Box sx={{display: 'flex', gap: '10px', mt: 2, alignItems: 'center'}}>
        <RoundedCheckbox />
        <Box
            sx={{fontSize: '16px', lineHeight: '24px', fontWeight: 400, fontFamily: 'Proxima Nova'}}
        >Still studying</Box>
    </Box>
}