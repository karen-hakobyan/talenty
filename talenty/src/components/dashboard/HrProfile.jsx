import { Box, Container } from "@mui/material";
import { systemCompanyAjab } from "../../ajab";
import { UploadPhoto } from "../../assets/icons/hrProfile";
import { MAIN_PURPLE } from "../../style/colors";
import {styled} from "@mui/system";
import { useState } from "react";
import { socialMediaData } from "../hrProfaile/helper";


const CostumInput = styled("input")((theme)=>({
    minWidth:"50px",
    outline: "none",
    border: "none",
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "18px"
}))




export default function HrProfile  (){
    const [data,setData]= useState(systemCompanyAjab)
    const [value,setValue]=useState(data.name)
    const [mediaData,setMediaData]=useState(socialMediaData)
    console.log(mediaData);
    const firstBox = {
        id:data.id,
        name: data.name,
        fields:data.fields[0]
    }

    return <Box>
            <Box sx={{position:"relative"}}>
                <Box sx={{
                    position:"relative",
                    background:"#000",
                    height:391
                    }}>
                    <Box sx={{
                        position:"absolute",
                        top:"25px",
                        right:"65px"
                    }}>
                        <UploadPhoto/>
                    </Box>
                </Box>
                <Box sx={{
                        position:"absolute",
                        top:358,
                        left:60,
                        display:"flex",
                        alignItems:"center",
                        width:"calc(100%-60px)",
                        justifyContent:"space-between",
                        "& span":{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            ml:2
                        },
                        
                        }}>
                        <Box sx={{
                            display:"flex"
                        }}>
                            <Box sx={{
                             display:"flex",
                             flexDirection:"column",
                             justifyContent:"end",
                             position:"relative",
                             background:MAIN_PURPLE,
                             width:"106px",
                             height:"106px",
                             borderRadius:"15px"
                            }} >
                                   <Box sx={{
                                        width:"12px",
                                        height:"10.38px",
                                        position:"absolute",
                                        top:"12px",
                                        right:"24px"
                                        }}>
                                        <UploadPhoto/>
                                    </Box>
                                <Box sx={{
                                    "& span":{
                                        fontFamily:'Poppins',
                                        fontSize: "10px",
                                        lineHeight: "15px",
                                        color:"#fff",
                                        display:"flex",
                                        height:33,
                                        borderRadius: "15px",
                                        transition:"all .5s",
                                        margin:"0 auto"  
                                    },
                                    "& span:hover":{
                                        background:"#6a0ab6",
                                        transition:"all .5s",
                                    }

                                }}>
                                    <span>Add Profile Photo</span>
                                </Box>
                            </Box>
                            <Box sx={{
                             display:"flex",
                             alignItems:"center",
                             marginLeft:2
                         }}>
                            <CostumInput
                                value={value}
                                onChange={e=>{
                                    setValue(e.target.value)
                                    console.log(value);
                                }}
                                onBlur={()=>{
                                    setData({
                                        ...data,
                                        name:value
                                    })

                                }} 
                            />
                         </Box>
                        </Box>
                        
                         <Box sx={{
                             display:"flex"
                         }}>
                            {mediaData.map(({id,open,Icon})=>(
                                <Box key={id}><Icon/></Box>
                            ))}
                         </Box>

                    </Box>
            </Box>
       {/* </Container> */}
    </Box>
}
