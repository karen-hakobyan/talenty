import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Dialogs from "./components/dialogs";
import Routes from "./routes";
import {getJwt} from "./components/dashboard/helper";
import {setAuthInitialState, setAuthSignOut} from "./store/auth/authSlice";
import { LANDING_PAGE_ROUTE } from "./constants/routes";
import {setGlobalInitialData, setTemplateData} from "./store/globalData/slice";

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSignOut = useSelector(state => state.auth.signOut)

    useEffect(() => {
        if(!getJwt()) {
            dispatch(setAuthInitialState())
        }
    },[dispatch])
    useEffect(() => {
        if(isSignOut) {
            console.log('mtav appi effecti mej')
            navigate(LANDING_PAGE_ROUTE)
            dispatch(setGlobalInitialData())
            dispatch(setAuthSignOut(false))
        }
    },[isSignOut, navigate, dispatch])
    return (
        <>
            <Dialogs/>
            <Routes/>
        </>
    );
}

export default App;
