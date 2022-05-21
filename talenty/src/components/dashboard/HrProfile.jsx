import { Box } from "@mui/material";
import { useSselectlist } from "./hook";
import HrProfaileHeder from "../hrProfaile/HrProfaileHeder";
import HrProfaileBody from "../hrProfaile/HrProfaileBody";







export default function HrProfile() {


    useSselectlist()
    return <Box>
        <HrProfaileHeder />
        <Box sx={{
            mt: "147px"
        }}>
            <HrProfaileBody />
        </Box>
    </Box>
}
