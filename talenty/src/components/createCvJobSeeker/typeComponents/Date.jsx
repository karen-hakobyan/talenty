import SubSection from "../../shared/subSection";
import TextField from "../../../shared/components/Textfield";
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {DatePicker, LocalizationProvider} from "@mui/lab";

export default function Date({data}) {
    return <SubSection label={data.name} inputComponent={<LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
            onChange={() => {}}
            renderInput={(params) => <TextField {...params} sx={{width: '500px'}} />}
        />
    </LocalizationProvider>}/>
}