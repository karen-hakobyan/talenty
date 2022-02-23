import {Checkbox} from "@mui/material";
import {Box} from "@mui/material";

export default function RoundedCheckbox({...restProps}) {
    return <Checkbox
        {...restProps}
        icon={<Box sx={{width: '22px', height: '22px', borderRadius: '50%',border: "1px solid #D9D9D9" }} />}
        checkedIcon={<Box sx={{width: '22px', height: '22px', borderRadius: '50%',border: "1px solid #D9D9D9", background: '#8C0DF0' }} />}
        />
}