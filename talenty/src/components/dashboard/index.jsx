import {useEffect} from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import CvTemplateMain from "../cvTemplate/CvTemplateMain";
import Header from "./Header";
import Navigation from "./Navigation";
import {selectAuthJwt, selectAuthUserInfo} from "../../store/auth/selector";
import {LANDING_PAGE_ROUTE} from "../../constants/routes";
import JobAnnouncement from "./JobAnnouncement";

export default function Dashboard() {
    const jwt = useSelector(selectAuthJwt)
    const userInfo = useSelector(selectAuthUserInfo)
    const navigate = useNavigate()

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
                    <Route path='announcement' element={<JobAnnouncement />} />
                </Routes>
            </Box>
        </Box>
    );
}
