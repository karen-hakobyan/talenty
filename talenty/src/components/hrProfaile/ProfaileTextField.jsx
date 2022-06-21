import { useEffect, useState } from "react";
import { isValidRationalNumber } from "../../helpers/actions";
import { COUNTRY_NAMES } from "../../helpers/country";
import { validate } from "../../helpers/validation/validation";
import Select from "../../shared/components/Select";
import TextField from "../../shared/components/Textfield";

function changeData(arr, parentId, childId, value) {
    return arr.map(el => el.id === parentId ? {...el, fields: el.fields.map(field => {
        if(field.id === childId) {
            return {...field, value}
        } else {
            return field
        }
    })}: el)
}
export default function ProfaileTextField ({data,placeholder,parentId,childId,setData,type,values}){
    const [value,setValue]=useState("")
    const [err, setErr]=useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
        if(values){
            setValue(values)
        }
    },[values])
    useEffect(()=>{
        if(type==="input" && value){
            setErr(validate({value,uppercase:true,maxLength:20}))
        }else if(type === "number" && value){
            setErr(validate({value,maxLength:15}))
        }else if(type === "link" && value){
            setErr(validate({isURL:true,value:value}))
        }else{
            setErr({error: false,
                massage: ""})
        }

    },[value,type])

    if(type==="select"){
        return <Select
        placeHolder={placeholder}
        value={value || undefined}
        onChange={(event)=>{
            setValue(event.target.value)
        }}
        onBlur = {()=>{
            setData(changeData(data,parentId,childId,value))
        }}
        fieldStyle={{width:"350px",mr:"26px",}}
        menuItems={COUNTRY_NAMES}
         />
    }
    return <TextField sx={{
        width:"429px",
        mr:"26px",
        
    }}
    value = {value}
    error={err?.error}
    helperText={err?.massage}
    onChange={(event) => {
        if(type === "number"){
            if(isValidRationalNumber(event.target.value)){
                setValue(event.target.value)
            }
        }else if(type ==="input"){
            setValue(event.target.value)
        }else{
            setValue(event.target.value)
        }
    }}
    onBlur = {()=>{
        setData(changeData(data,parentId,childId,value))

    }}
    placeholder={placeholder}
    />
}
