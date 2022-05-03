import {useEffect} from "react";
import {Box} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import CvTemplateMain from "../cvTemplate/CvTemplateMain";
import Header from "./Header";
import Navigation from "./Navigation";
import {selectAuthJwt, selectAuthUserInfo} from "../../store/auth/selector";
import {LANDING_PAGE_ROUTE} from "../../constants/routes";
import JobAnnouncement from "./JobAnnouncement";
import {getJwt} from "./helper";
import {setAuthInitialState} from "../../store/auth/authSlice";
import Pending from "./Pending";
import CurrentJobs from "./CurrentJobs";

export default function Dashboard() {
    const jwt = useSelector(selectAuthJwt)
    const userInfo = useSelector(selectAuthUserInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!getJwt()) {
            dispatch(setAuthInitialState())
        }
    }, [dispatch])
    useEffect(() => {
        if (userInfo === null) {
            navigate(LANDING_PAGE_ROUTE)
        }
    }, [userInfo, navigate])
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
                    <Route path='announcement' element={<JobAnnouncement/>}/>
                    <Route path='current-jobs' element={<CurrentJobs/>}/>
                    <Route path='pending' element={<Pending/>}/>
                </Routes>
            </Box>
        </Box>
    );
}
