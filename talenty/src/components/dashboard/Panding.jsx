import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pendingAnnoucementList } from "../../store/globalData/getTemplateActions";
import Tables from "../table/Table";


export default function Panding(){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(pendingAnnoucementList())
    },[dispatch])
    return(
        <Box sx={{
            width:"100%",
            margin:"24px 24px 0",
            }}>
            <Box 
                sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 32,
                    color:"#5A029F",
                    marginBottom:5.5
                }}
            >Pending  jobs</Box>
            <Tables/> 
        </Box>
    )
}
