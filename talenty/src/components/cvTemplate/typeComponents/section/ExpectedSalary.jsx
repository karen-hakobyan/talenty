import {TextField} from "@mui/material";
import {DISABLED_INPUT, TEMPLATE_INPUT} from "../../../../shared/styles";

export default function ExpectedSalary({data}) {
    return (
        <TextField
            placeholder={data?.metadata.placeholder}
            disabled
            variant="outlined"
            sx={{...TEMPLATE_INPUT, ...DISABLED_INPUT, width: "321px"}}
            InputProps={{sx: {
                height: "40px",
                fontFamily: "'Poppins', sans-serif",
                fontSize:16,
        }}}
        />
    );
}
