import React from "react";
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import TextField from "../../shared/components/Textfield";
import {changeDateFormat} from "../createCvJobSeeker/typeComponents/sectionContainerTypes/DateSubSection";

export default function BasicDatePicker({
                                            fieldProps = {},
                                            pickerProps = {},
                                            fieldStyle = {},
                                            value,
                                            onChange = () => {
                                            },
                                            placeholder
                                        }) {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                value={(value && changeDateFormat(value)) || null}
                {...pickerProps}
                onChange={onChange}
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        sx={{
                            width: '500px',
                            fontFamily: "'Poppins', sans-serif",
                        ...fieldStyle}}
                        inputProps={{...params.inputProps, placeholder,sx:{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "16px",
                            lineHeight: "24px"
                        }}}
                        InputProps={{sx: {
                            height: "40px",
                            fontFamily: "'Poppins', sans-serif",
                            fontSize: "16px",
                            lineHeight: "24px"
                        }}}
                    />
                }}
            />
        </LocalizationProvider>
    );
}
