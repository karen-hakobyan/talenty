import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import Dialogs from "./components/dialogs";
import Routes from "./routes";
import {getJwt} from "./components/dashboard/helper";
import {setAuthInitialState} from "./store/auth/authSlice";

function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if(!getJwt()) {
            dispatch(setAuthInitialState())
        }
    },[dispatch, navigate])
    return (
        <>
            <Dialogs/>
            <Routes/>
        </>
    );
}

export default App;
