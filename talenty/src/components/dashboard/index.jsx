import {Box} from "@mui/material";
import { useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import CvTemplateMain from "../cvTemplate/CvTemplateMain";
import Header from "./Header";
import Navigation from "./Navigation";
import {selectAuthJwt} from "../../store/auth/selector";

export default function Dashboard() {
    const jwt = useSelector(selectAuthJwt)
    if (!jwt) {
        return null;
    }
    return (
        <Box>
            <Header/>
            {/* body */}
            <Box sx={{display: "flex"}}>
                <Navigation maxWidth={282} minWidth={82}/>
                <Routes>
                    <Route path="/" element={<h1>Talenty!!!</h1>}/>
                    <Route path="template" element={<CvTemplateMain/>}/>
                </Routes>
            </Box>
        </Box>
    );
}
