import {useEffect, useState} from "react";
import {
    ANNOUNCEMENT_FILTER_LIST,
    ANNOUNCEMENT_VIEW_MORE,
    GET_JOB_ANNOUNCEMENTS_FILTER,
    instance
} from "../../constants/requests";
import {useDispatch} from "react-redux";
import {setLoading} from "../../store/auth/authSlice";

//search controller controls whether it should search via button click
const useGetSearchData = ({
                              searchButtonClick,
                              setSearchButtonClick = () => {
                              },
                              jobType,
                              employmentTerms,
                              jobCategory,
                              location,
                              title,
                              candidateLevel,
                          } = {}) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        // after click to filter button filter accordingly
        if (searchButtonClick) {
            console.log(searchButtonClick)
            dispatch(setLoading(true))
            setSearchButtonClick(false)
            instance.post(GET_JOB_ANNOUNCEMENTS_FILTER, {
                // search:title?title:null,
                employmentTerms: employmentTerms ? [employmentTerms] : null,
                jobType: jobType ? [jobType] : null,
                jobCategory: jobCategory ? [jobCategory] : null,
                candidateLevel: candidateLevel ? [candidateLevel] : null,
                location: location ? [location] : null,
            }).then((response) => {
                setData(response.data)
                dispatch(setLoading(false))
            }).catch(() => {
                dispatch(setLoading(false))
                console.log('filters error')
            })
        }
    }, [searchButtonClick, setSearchButtonClick, title, jobCategory, jobType, employmentTerms, location, candidateLevel, dispatch])
    useEffect(() => {
        dispatch(setLoading(true))
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

    return data
}

export function useGetAnnouncementFilterList() {
    const [filters, setFilters] = useState([])
    useEffect(() => {
        instance.get(ANNOUNCEMENT_FILTER_LIST)
            .then((response) => {
                setFilters(response.data)
            }).catch((err) => {
            console.log(err)
            console.log('error filter during get filters list')
        })
    }, [])

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
