import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Box, Radio} from "@mui/material";
import JobSeekerSubsection from "../job-seeker/createCvJobSeeker/JobSeekerSubsection";
import {RADIO_LABEL} from "../job-seeker/createCvJobSeeker/style";
import {changeDialogDataById} from "../../store/dialogs/slice";
import TextField from "../../shared/components/Textfield";
import Select from "../../shared/components/Select";
import {isValidRationalNumber} from "../../helpers/actions";
import { validationNumber } from "../../helpers/validation/validation";

export default function Section({data}) {
    const dispatch = useDispatch()
    const [type, from, to, currency] = data.fields
    const [fromValue, setFromValue] = useState(from.metadata.submitted_value || '')
    const [toValue, setToValue] = useState(to.metadata.submitted_value || '')
    const [toErr, setToErr] = useState({
        positon: "",
        error:false,
        massage: "" 
    })
    const [fromErr, setFromErr] = useState({
        positon: "",
        error:false,
        massage: "" 
    })
    useEffect(()=>{
        if(fromValue){
            setFromErr(validationNumber({from:fromValue,to:toValue,maxLength:10,isValidetion:"from"}))
        }else{
            setFromErr({
                positon: "",
                error:false,
                massage: "" 
            })
        }
    },[fromValue,toValue])
    useEffect(()=>{
        if(toValue){
            setToErr(validationNumber({from:fromValue,to:toValue,maxLength:10,isValidetion:"to"}))
        }else{
            setToErr({
                positon: "",
                error:false,
                massage: "" 
            })
        }
        
    },[fromValue,toValue])

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
                            error={fromErr?.error}
                            helperText={fromErr.massage}
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
                            placeholder={to.metadata.placeholder}
                            error={toErr?.error}
                            helperText={toErr.massage}
                            onChange={
                                (event) => {
                                    if (isValidRationalNumber(event.target.value)) {
                                        setToValue(event.target.value)
                                    }
                                }
                            }
                            onBlur={() => {
                                dispatch(changeDialogDataById({id: to.id, value: toValue}))
                            }}
                        />
                    }
                />
                <JobSeekerSubsection label={<Box sx={{opacity: 0}} children='something'/>}
                                     Component={
                                         <Select
                                             placeHolder={currency.metadata.placeholder}
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
            </Box>
        }
    />

}
