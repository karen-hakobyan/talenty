import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { GET_CONFIRM_ANNOUCEMENT, GET_PENDINGS_ANNOUCEMENT, instance } from "../../constants/requests"
import { setLoading } from "../../store/auth/authSlice"
import { changeInitialData, pendingDataChange } from "./helper"


export const useTableData = () => {
    const { pathname } = useLocation()
    const [data, setData] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        (async() => {
            dispatch(setLoading(true))
            await instance.get(pathname.endsWith("current-jobs") ? GET_CONFIRM_ANNOUCEMENT : GET_PENDINGS_ANNOUCEMENT).then((response) => {
                setData(response.data)
                dispatch(setLoading(false))
            }).catch(err => {
                dispatch(setLoading(false))
            })
        })()

    }, [dispatch, pathname])
    if (pathname.endsWith("pending")) {
        return pendingDataChange(data)
    }
    return changeInitialData(data)
}