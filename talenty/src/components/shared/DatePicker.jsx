import React, {useState} from "react";
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import TextField from "../../shared/components/Textfield";

export default function BasicDatePicker({fieldProps = {}, pickerProps = {}, fieldStyle = {}}) {
    let [value, setValue] = useState(null)
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                value={value}
                {...pickerProps}
                onChange={(event) => setValue(event)}
                renderInput={(params) => {
                    console.log(params)
                    return <TextField {...params} sx={{width: '500px'}} inputProps={{...params.inputProps, placeHolder: 'DD/MM/YY'}}/>
                }}
            />
        </LocalizationProvider>
    );
}
