import React, {useState} from "react";
import DatePicker from '@mui/lab/DatePicker';
import DateAdapter from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import TextField from "../../shared/components/Textfield";
import {
    changeDateFormat,
    validateDate
} from "../job-seeker/createCvJobSeeker/typeComponents/sectionContainerTypes/DateSubSection";

export default function BasicDatePicker({
                                            fieldProps = {},
                                            pickerProps = {},
                                            fieldStyle = {},
                                            value,
                                            onChange,
                                            placeholder,
                                            closeAction,
                                        }) {
    const [innerValue, setInnerValue] = useState(value)
    let sendValue = null
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
                value={(innerValue && changeDateFormat(innerValue)) || null}
                {...pickerProps}
                onChange={onChange || function (event) {
                    let val = validateDate(event.toLocaleDateString())
                    setInnerValue(val)
                    sendValue = val
                }}
                renderInput={(params) => {
                    return <TextField
                        {...params}
                        sx={{
                            width: '500px',
                            fontFamily: "'Poppins', sans-serif",
                            ...fieldStyle,
                            "& input.Mui-disabled": {
                                textFillColor: "rgba(0, 0, 0, 0.87)"
                            }
                        }}
                        inputProps={{
                            ...params.inputProps, placeholder, sx: {
                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "16px",
                                lineHeight: "24px"
                            },
                            disabled: true,
                        }}
                    />
                }}
                onClose={closeAction ? () => {
                    closeAction(sendValue)
                } : () => {
                }}
            />
        </LocalizationProvider>
    );
}
