import {Box} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import {CREATE_CV} from "../../constants/routes";
import CreateCvJobSeeker from "../createCvJobSeeker";

export default function HomeJobSeeker() {
    return (
        <Box>
            <Header/>
            <Box sx={{mt: '74px'}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="jobs" element={<h1>Jobs</h1>}/>
                    <Route path="search" element={<h1>Search</h1>}/>
                    <Route path={CREATE_CV} element={<CreateCvJobSeeker/>}/>
                </Routes>
            </Box>

        </Box>
    );
}
