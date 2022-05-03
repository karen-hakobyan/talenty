import {Box} from "@mui/system";
import Tables from "../table/Table";
import { useTableData } from "./hook";


export default function CurrentJobs() {
    const data =  useTableData()
    if(!data){
        return null
    }
    return (
        <Box sx={{
            flex: 1,
            padding: "24px 24px 0",
        }}>
            <Box
                sx={{
                    fontFamily: 'Poppins',
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: 32,
                    color: "#5A029F",
                    marginBottom: 5.5
                }}
            >Current jobs</Box>
            <Tables data={data}/>
        </Box>
    )
}
