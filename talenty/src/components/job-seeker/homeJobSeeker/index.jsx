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
import {ANNOUNCEMENT, CREATE_CV, PROFILE} from "../../../constants/routes";
import Jobs from "../jobs/Jobs";
import Search from "../search/Search";
import SearchRoute from "../search/SearchRoute";

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
                    <Route path="jobs" element={<Jobs/>}/>
                    <Route path="search" element={<SearchRoute/>}/>
                    <Route path={CREATE_CV} element={<CreateCvJobSeeker/>}/>
                    <Route path={PROFILE} element={<JobSeekerProfile/>}/>
                </Routes>
            </Box>

        </Box>
    );
}
