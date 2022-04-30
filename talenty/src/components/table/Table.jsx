import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { tableHeder } from "./helper";


export default function Tables(){
    console.log(tableHeder)
    return (
        <Box sx={{
            wisth:"100%",
            }}>
        <TableContainer component={Paper}>
            <Table sx={{wisth:"100%"}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHeder.map(el=>{
                            return(
                                <TableCell key={el.key}>{el.text}</TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
        </Box>
    )
}

{/* <table>
                <tr>
                    {tableHeder.map(el=>{
                        return (
                            <td key={el.key}>{el.text}</td>
                        )
                    })}
                </tr>
            </table>   */}
