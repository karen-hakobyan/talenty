import {useState} from "react";
import {useDispatch} from "react-redux";
import {Box, Radio} from "@mui/material";
import JobSeekerSubsection from "../createCvJobSeeker/JobSeekerSubsection";
import {RADIO_LABEL} from "../createCvJobSeeker/style";
import {changeDialogDataById} from "../../store/dialogs/slice";
import TextField from "../../shared/components/Textfield";
import Select from "../../shared/components/Select";
import {isValidRationalNumber} from "../../helpers/actions";

export default function Section({data}) {
    const dispatch = useDispatch()
    const [type, from, to, currency] = data.fields
    const [fromValue, setFromValue] = useState(from.metadata.submitted_value || '')
    const [toValue, setToValue] = useState(to.metadata.submitted_value || '')

    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                {/* bellow will be type */}
                <JobSeekerSubsection
                    label={type.name}
                    Component={
                        <Box sx={{display: 'flex', gap: '20px'}}>
                            {type.metadata.values.map(el => {
                                return (
                                    <Box sx={{display: 'flex', alignItems: 'center'}} key={el}>
                                        <Radio
                                            checked={type.metadata.submitted_value === el}
                                            onChange={() => {
                                                dispatch(changeDialogDataById({id: type.id, value: el}))
                                            }}
                                        />
                                        <Box
                                            sx={
                                                {
                                                    ...RADIO_LABEL,
                                                    color: type.metadata.submitted_value === el ? '#8C0DF0' : '#636366',
                                                }
                                            }
                                        >
                                            {el}
                                        </Box>
                                    </Box>
                                )
                            })}
                        </Box>
                    }
                />
                <JobSeekerSubsection
                    label={from.name}
                    Component={
                        <TextField
                            sx={{width: '226px'}}
                            placeholder={from.metadata.placeholder}
                            value={fromValue}
                            onChange={
                                (event) => {
                                    if (isValidRationalNumber(event.target.value)) {
                                        setFromValue(event.target.value)
                                    }
                                }
                            }
                            onBlur={() => {
                                dispatch(changeDialogDataById({id: from.id, value: fromValue}))
                            }}
                        />
                    }
                />
                <JobSeekerSubsection
                    label={to.name}
                    Component={
                        <TextField
                            sx={{width: '226px'}}
                            value={toValue}
                            onChange={
                                (event) => {
                                    if (isValidRationalNumber(event.target.value)) {
                                        setToValue(event.target.value)
                                    }
                                }
                            }
                            placeholder={to.name}
                            onBlur={() => {
                                dispatch(changeDialogDataById({id: to.id, value: toValue}))
                            }}
                        />
                    }
                />
                <JobSeekerSubsection label={<Box sx={{opacity: 0}} children='something'/>}
                                     Component={
                                         <Select
                                             placeHolder="Rate"
                                             textFieldWidth={'99px'}
                                             menuItems={currency.metadata.values}
                                             value={currency.metadata.submitted_value}
                                             onChange={(event) => {
                                                 dispatch(changeDialogDataById({
                                                     id: currency.id,
                                                     value: event.target.value
                                                 }))
                                             }}
                                         />
                                     }
                />
                {/*<JobSeekerSubsection*/}
                {/*    label={<Box>{deadline.name} *</Box>}*/}
                {/*    sx={{ml: '38px'}}*/}
                {/*    Component={*/}
                {/*        <BasicDatePicker*/}
                {/*            placeholder="Deadline"*/}
                {/*            value={deadline.metadata.submitted_value}*/}
                {/*            onChange={*/}
                {/*                (event) => {*/}
                {/*                    dispatch(changeDialogDataById({*/}
                {/*                        id: deadline.id,*/}
                {/*                        value: validateDate(event.toLocaleDateString()),*/}
                {/*                    }))*/}
                {/*                }*/}
                {/*            }*/}
                {/*            pickerProps={{minDate: new Date()}}*/}
                {/*            fieldStyle={{width: '300px'}}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
            </Box>
        }
    />

}
