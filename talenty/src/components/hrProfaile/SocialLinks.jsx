import React, { useContext, useEffect, useState } from "react"
import { Box, TextField } from "@mui/material"
import { Chek, Delete } from "../../assets/icons/hrProfile"
import { MAIN_PURPLE } from "../../style/colors"
import { CompanyProfile } from "./CompanyProfile"
import { validate } from "../../helpers/validation/validation"




export const SocialLinks = ({ placeholder, onClose,name }) => {
    const {data,setData} = useContext(CompanyProfile)
    const [value, setValue] = useState("")
    const [err, setErr]=useState({
        error: false,
        massage: ""
    })
    useEffect(()=>{
        if(name === "facebook" && data.links?.facebook ){
           setValue(data.links.facebook)
        }
        if(name === "twitter" && data.links?.twitter){
            setValue(data.links.twitter)
        }
        if(name === "linkedin" && data.links?.linkedine){
            setValue(data.links.linkedine)
        }
        if(name ==="instagram" && data.links?.instagram){
            setValue(data.links.instagram)
        }
    },[name,data.links])
    useEffect(()=>{
        if(value){
            setErr(validate({isURL:true,value:value}))
        }else{
            setErr({
                error: false,
                massage: ""
            })
        }
    },[value])
    const onSaveValue = (data,value)=>{
        if(name === "facebook"){
            return {
                ...data,
                facebook:value,
            }
        }
        if(name === "twitter"){
            return {
                ...data,
                twitter:value,
            }
        }
        if(name === "linkedin"){
            return {
                ...data,
                linkedin:value,
            }
        }
        return {
            ...data,
            instagram:value
        }
    }
    return <Box sx={{
        position: "absolute",
        top: "40px",
        right: 0
    }}>
        <TextField
            placeholder={placeholder}
            value={value}
            error={err?.error}
            helperText={err?.massage}        
            onChange={(e) => {
                setValue(e.target.value)
            }}
            onBlur={() => {
                if(value && !err.error){
                    setData({
                        ...data,
                        links : onSaveValue(data.links, value)
                    })
                    onClose()}  
                }}
            InputProps={{
                sx: {

                    height: "40px",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: 15,
                    boxSizing: "border-box",
                },
                endAdornment: <Box sx={{
                    display: 'flex',
                }}>
                    <Box sx={{
                        mr: "23.75px",
                        cursor: "pointer"
                    }}
                    // onClick={onClose}
                    onClick={() => {
                        if(value && !err.error){
                            setData({
                                ...data,
                                links : onSaveValue(data.links, value)
                            })
                            onClose()}  
                        }}
                    ><Chek /></Box>
                    <Box sx={{
                        cursor: "pointer"
                    }}
                        onClick={() => {
                            setValue("")
                        }}
                    ><Delete  /></Box>
                </Box>
            }}
            sx={{
                boxSizing: "border-box",
                width: "461px",
                ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input": {
                    boxSizing: "border-box",
                },
                ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                    borderColor: MAIN_PURPLE,
                },
                "&::placeholder": {
                    fontFamily: "'Poppins', sans-serif",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    fontSize: "15px",
                    lineHeight: "24px",
                },

            }}
        />
    </Box>
}
