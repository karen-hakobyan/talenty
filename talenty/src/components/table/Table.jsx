import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ArrowTable, EditAnnouncement, NumberOfCvSenders, NumberOfViewers } from "../../assets/icons/table";
import { FLEX_CENTER, TABLE_BODY_STYLE, TABLE_CELL_STYLE, TABLE_CONTAINER, TABLE_FLEX, TABLE_HEAD_FONST_STYLE,SPAN_STYLE } from "./style";


export default function Tables({data}){
    const {tableHed,tableBody}= data
    if(!tableHed || !tableBody){
        return null
    }
    return (
        <Box >
        <TableContainer component={Paper} sx={TABLE_CONTAINER}>
            <Table sx={{borderCollapse:"inherit"}} aria-label="simple table">
                <TableHead sx={{
                    borderCollapse:"none"
                }}>
                    <TableRow sx={TABLE_HEAD_FONST_STYLE}>
                        {tableHed?tableHed.map(el=>{
                            return (<TableCell 
                                        key={el.key}
                                        sx={TABLE_CELL_STYLE}
                                    ><Box sx={TABLE_FLEX}>
                                        <Box>{el.text}</Box>
                                        {el.IconComponent?<Box>{<ArrowTable/>}</Box>:null}
                                    </Box>
                                    </TableCell>)
                        }):null}
                    </TableRow>
                </TableHead>
                <TableBody sx={{
                    borderCollapse:"none",
                }} > 
                    {tableBody.map((el,i)=>{
                        return (
                            <TableRow key={el.id}  sx={TABLE_BODY_STYLE}>
                                <TableCell align="right">{i+1}</TableCell>
                                <TableCell>{el.name?el.name:null}</TableCell>
                                <TableCell>{el.deadline?el.deadline:null}</TableCell>
                                <TableCell>{el.country? el.country:null}</TableCell>
                                <TableCell >More....</TableCell>
                                <TableCell >
                                    <Box sx={FLEX_CENTER}>
                                        <Box sx={{
                                            ...SPAN_STYLE,
                                            marginRight:"23px"
                                        }}><span><NumberOfViewers/></span>123</Box>
                                        <Box sx={SPAN_STYLE}><span><NumberOfCvSenders/></span>123</Box>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box><EditAnnouncement/></Box>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    )
}



