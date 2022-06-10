import { useEffect, useState } from "react";
import { isValidRationalNumber } from "../../helpers/actions";
import { COUNTRY_NAMES } from "../../helpers/country";
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
    useEffect(()=>{
        if(values){
            setValue(values)
        }
    },[values])
    if(type==="select"){
        return <Select
        placeHolder={placeholder}
        value={value}
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
