import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import DateAdapter from '@mui/lab/AdapterDateFns'
import {useDispatch, useSelector} from "react-redux";
import Dialogs from "./components/dialogs";
import Routes from "./routes";
import {getJwt} from "./components/dashboard/helper";
import {setAuthInitialState, setAuthIsChangePass, setAuthSignOut} from "./store/auth/authSlice";
import {LANDING_PAGE_ROUTE, SIGN_IN_ROUTE} from "./constants/routes";
import {setGlobalInitialData} from "./store/globalData/slice";
import {selectIsChangePassword} from "./store/auth/selector";
import {LocalizationProvider} from "@mui/lab";

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSignOut = useSelector(state => state.auth.signOut)
    const isChangePassword = useSelector(selectIsChangePassword)

    useEffect(() => {
        if (!getJwt() && isSignOut) {
            dispatch(setAuthInitialState())
        }
    }, [dispatch, isSignOut])
    useEffect(() => {
        if (isSignOut) {
            navigate(LANDING_PAGE_ROUTE)
            dispatch(setGlobalInitialData())
            dispatch(setAuthSignOut(false))
        }
    }, [isSignOut, navigate, dispatch])
    useEffect(() => {
        if (isChangePassword) {
            navigate(SIGN_IN_ROUTE)
            dispatch(setAuthIsChangePass())
        } else if (isChangePassword === false) {
            navigate(LANDING_PAGE_ROUTE)
            dispatch(setAuthIsChangePass())
        }
    }, [navigate, isChangePassword, dispatch])
    return (
        <>
            <Dialogs/>
            <Routes/>
        </>
    );
}

export default App;
