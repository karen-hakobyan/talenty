import { Box } from "@mui/material";
import {  useSelector } from "react-redux";
import { selectAnnoucementList } from "../../store/globalData/selector";
import Tables from "../table/Table";


export default function Panding(){
    const annoucementList = useSelector(selectAnnoucementList)
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
            <Tables data={annoucementList}/> 
        </Box>
    )
}
