import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableHeder } from "./helper";


export default function Tables({data}){
    const {tableHed,tableBody}= data
    return (
        <Box sx={{
            }}>
        <TableContainer component={Paper}>
            <Table sx={{wisth:"100%"}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHed?tableHed.map(el=>{
                            return (<TableCell key={el.key} >{el.text}</TableCell>)
                        }):null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableBody.map((el,i)=>{
                        return (
                            <TableRow key={el.id}>
                                <TableCell>{i+1}</TableCell>
                                {el.fields.map(el=>{
                                    return (
                                        <TableCell key={el.key}>{el.text}</TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </Box>
    )
}
// {tableHeder.map(el=>{
//     return(
//         <TableCell key={el.key}>{el.text}</TableCell>
//     )
// })}


