import React, { useContext } from "react";
import { Box } from "@mui/material";
import HrProfaileHeder from "../hrProfaile/HrProfaileHeder";
import HrProfaileBody from "../hrProfaile/HrProfaileBody";
import { useSelectlist,useHrProfaileUsersinfo } from "./hook";




const CompanyProfile = React.createContext()


export default function HrProfile() {
    const [legalForm,industry,benefits] = useSelectlist()
    console.log(useHrProfaileUsersinfo());
    
    const context = useContext(CompanyProfile)
    return <Box>
        <CompanyProfile.Provider value={{}}>
        <HrProfaileHeder />
        <Box sx={{
            mt: "147px"
        }}>
            <HrProfaileBody  legalForm={legalForm} industry={industry} />
        </Box>
        </CompanyProfile.Provider>
        
    </Box>
}
