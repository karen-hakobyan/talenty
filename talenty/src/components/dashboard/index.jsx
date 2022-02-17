import {Box} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import {USER_INFO} from "../../constants/redux/globalData";
import {LANDING_PAGE_ROUTE} from "../../constants/routes";
import {checkNavigation} from "../../helpers/actions";
import {selectGlobalDataViaKey} from "../../store/globalData/selector";
import {setGlobalDataViaKey} from "../../store/globalData/slice";
import CvTemplateMain from "../cvTemplate/CvTemplateMain";
import Header from "./Header";
import {getJwt} from "./helper";
import Navigation from "./Navigation";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(selectGlobalDataViaKey(USER_INFO));

    useEffect(() => {
        checkNavigation(navigate, LANDING_PAGE_ROUTE, true);
        let jwt = getJwt();
        let dataInfo = jwt ? JSON.parse(atob(jwt.split(".")[1])) : false;
        if (dataInfo) {
            dispatch(setGlobalDataViaKey({key: USER_INFO, value: dataInfo}));
        }
        // TODO orient with above comment
    }, [navigate, dispatch]);

    if (!userInfo) {
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
