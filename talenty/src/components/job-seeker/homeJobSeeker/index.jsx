import {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Box} from "@mui/material";
import Header from "./Header";
import Home from "./Home";
import CreateCvJobSeeker from "../createCvJobSeeker";
import {setAuthInitialState} from "../../../store/auth/authSlice";
import {getJwt} from "../../dashboard/helper";
import JobSeekerProfile from "../profile/JobSeekerProfile";
import {CREATE_CV, PROFILE} from "../../../constants/routes";

export default function HomeJobSeeker() {
    const dispatch = useDispatch()
    useEffect(() => {
        if (!getJwt()) {
            dispatch(setAuthInitialState())
        }
    }, [dispatch])
    return (
        <Box>
            <Header/>
            <Box sx={{mt: '74px'}}>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="jobs" element={<h1>Jobs</h1>}/>
                    <Route path="search" element={<h1>Search</h1>}/>
                    <Route path={CREATE_CV} element={<CreateCvJobSeeker/>}/>
                    <Route path={PROFILE} element={<JobSeekerProfile/>}/>
                </Routes>
            </Box>

        </Box>
    );
}
