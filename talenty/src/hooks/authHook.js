import {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectIsChangePassword} from "../store/auth/selector";
import {LANDING_PAGE_ROUTE, SIGN_IN_ROUTE} from "../constants/routes";
import {setGlobalInitialData} from "../store/globalData/slice";
import {setAuthIsChangePass, setAuthSignOut, setIsValidToken, setIsLoading,} from "../store/auth/authSlice";
import {setDialogInitialState} from "../store/dialogs/slice";

export const useAuthInitialEffects = () => {
    const dispatch = useDispatch()
    // const loading = useSelector(selectAuthLoading)
    const navigate = useNavigate()
    const isSignOut = useSelector(state => state.auth.signOut)
    const isChangePassword = useSelector(selectIsChangePassword)
    useEffect(() => {
        if (isSignOut) {
            navigate(LANDING_PAGE_ROUTE)
            dispatch(setGlobalInitialData())
            dispatch(setAuthSignOut(false))
        }
    }, [isSignOut, navigate, dispatch])

    // below effect is close any dialogs if app was closed before dialog close action
    // նեռքևի էֆեկտի իմաստը դիալոգ միամիտ բաց չմնա
    useEffect(() => {
        dispatch(setDialogInitialState())
        dispatch(setIsLoading(false))
    }, [dispatch])
    useEffect(() => {
        if (isChangePassword) {
            navigate(SIGN_IN_ROUTE)
            dispatch(setAuthIsChangePass())
            dispatch(setIsValidToken(null))
        } else if (isChangePassword === false) {
            navigate(LANDING_PAGE_ROUTE)
            dispatch(setAuthIsChangePass())
            dispatch(setIsValidToken(null))
        }
    }, [navigate, isChangePassword, dispatch])
}