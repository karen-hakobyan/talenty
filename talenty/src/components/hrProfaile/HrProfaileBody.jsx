import { Box } from "@mui/material";
import { useState } from "react";
import { Delete } from "../../assets/icons/hrProfile";
import TextField from "../../shared/components/Textfield";
import { TEXT } from "../../style/colors";
import { genId } from "../dashboard/helper";
import { body, newProductsSection, productsSection, ProfaileTypsComponent } from "./helper";
import { ADD_FILED, TITLE } from "./style";

export default function HrProfaileBody({industry,legalForm}) {
    const [productsSectionInfo,setProductsSectionInfo]=useState(productsSection)
    
    return <Box sx={{
        margin: "auto 60px"
    }}>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '18px'
        }} />
        <Box sx={{display:"flex",ml:"1px",gap:"266px", mb:"32px"}}>
            {body.map(el=>{
                return (<Box sx={{
                    width:"500px"
            }} key={el.id}>
                <Box>
                <Box sx={TITLE}> {el.name}</Box>
                    	<Box>{el.fields.map(el=>{
                    return (
                    <Box key={el.id} sx={{
                        display:"flex",
                        
                    }}>
                        <Box sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontSize:"16px",
                            lineHeight:"24px",
                            color: TEXT,
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"space-between",
                            width:"100%",
                            mb:"30px",
                            "& span":{
                                mr:"5px"
                            }
                        }}>
                            <span>{el.name}</span>
                            <Box><ProfaileTypsComponent type={el.type} placeholder={el.placeholder}
                                menuItems={el.type === "legal_form"? legalForm?.values : industry?.values}
                             />
                            </Box>
                        </Box>
                        
                    </Box>)
                })}</Box>
                </Box>
                
            </Box>)
            })}
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px'
        }} />
        <Box sx={{mb:"20px"}}>
            <Box sx={TITLE}>About Company </Box>
            <TextField
                inputPropsSx={{height: "100%",}}
                sx={{width:"100%"}}
                variant="outlined"
                multiline
                rows={5}
             />
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px'
        }} />
        <Box sx={{mb:"32px",}}>
            <Box sx={{display:"flex",alignContent:"center", gap:"23px",...TITLE}}>
                <Box>Products</Box>
                <Box sx={ADD_FILED} onClick={()=>{
                    

                    setProductsSectionInfo(newProductsSection())
                    console.log(productsSectionInfo);
                }} ><span>+</span>Add product</Box>
            </Box>
            <Box>
                {productsSectionInfo.map(el=>{
                    return<Box key={el.id} sx={{
                        display:"flex",
                        alignItems:"center"
                    }}>
                        {el.fields.map(el=>{
                            return <TextField sx={{
                                
                                width:"429px",
                                mr:"26px"
                            }} key={el.placeholder} placeholder={el.placeholder}/>
                        })}
                        {productsSectionInfo.length !== 1 && <Box><Delete/></Box>}
                        
                    </Box>
                })}
            </Box>
        </Box>
        <Box sx={{
            width: '100%',
            height: "1px",
            background: "#B3B4BB",
            mb: '30px'
        }} />

    </Box>
}
