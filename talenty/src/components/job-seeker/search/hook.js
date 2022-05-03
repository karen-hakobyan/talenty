import {useEffect, useState} from "react";
import {GET_CONFIRMED_JOB_ANNOUNCEMENTS, instance} from "../../../constants/requests";
import {useDispatch} from "react-redux";
import {setLoading} from "../../../store/auth/authSlice";

const useGetSearchData = () => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        instance.get(GET_CONFIRMED_JOB_ANNOUNCEMENTS).then(response => {
            dispatch(setLoading(false))
            setData(response.data)
        }).catch(err => {
            dispatch(setLoading(false))
            console.log('error during get confirmed job announcements')
        })
    }, [dispatch])
    return data
}

export default useGetSearchData