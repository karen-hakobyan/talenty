import {useEffect, useState} from "react";
import {
    ANNOUNCEMENT_FILTER_LIST, ANNOUNCEMENT_VIEW_MORE,
    GET_CONFIRMED_JOB_ANNOUNCEMENTS,
    GET_JOB_ANNOUNCEMENTS_FILTER,
    instance
} from "../../constants/requests";
import {useDispatch} from "react-redux";
import {setLoading} from "../../store/auth/authSlice";
import {getJwt} from "../dashboard/helper";

//search controller controls whether it should search via button click
const useGetSearchData = ({
                              searchButtonClick,
                              setSearchButtonClick = () => {
                              },
                              isInitiallyGetData,
                          } = {}) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(setLoading(true))
    //     instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
    //     instance.get(GET_CONFIRMED_JOB_ANNOUNCEMENTS).then(response => {
    //         console.log(response.data)
    //         setData(response.data)
    //     }).catch(err => {
    //         console.log('error during get confirmed job announcements')
    //         dispatch(setLoading(false))
    //     })
    // }, [dispatch])
    useEffect(() => {
        dispatch(setLoading(true))
        instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
        instance.post(GET_JOB_ANNOUNCEMENTS_FILTER, {
            employmentTerms: null,
            jobType: null,
            jobCategory: null,
            candidateLevel: null,
            location: null,
        }, {params: {page: 0, size: 10}}).then((response) => {
            dispatch(setLoading(false))
            console.log(response.data)
            setData(response.data)
        }).catch(err => {
            console.log(err)
            dispatch(setLoading(false))
        })
    }, [dispatch])

    useEffect(() => {
        if (searchButtonClick) {
            dispatch(setLoading(true))
            instance.post(GET_JOB_ANNOUNCEMENTS_FILTER, {
                employmentTerms: null,
                jobType: null,
                jobCategory: null,
                candidateLevel: null,
                location: null,
            }).then((response => {
                setLoading(false)
                setData(response.data)
            })).catch(() => {
                setLoading(false)
            })
        }
    }, [searchButtonClick, setSearchButtonClick])

    return data
}

export function useGetAnnouncementFilterList() {
    const [filters, setFilters] = useState([])
    instance.get(ANNOUNCEMENT_FILTER_LIST).then((response) => {
        setFilters(response.data)
    })

    return filters
}

export function useGetAnnouncementData(id) {
    const [announcementInfo, setAnnouncementInfo] = useState({})
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            dispatch(setLoading(true))
            instance.get(ANNOUNCEMENT_VIEW_MORE, {
                params: {id}
            }).then(response => {
                setAnnouncementInfo(response.data)
                dispatch(setLoading(false))
            }).catch(() => {
                dispatch(setLoading(false))
            })
        }
    }, [id, dispatch])

    return announcementInfo
}

export default useGetSearchData