import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_USER_INFO, instance } from "../../../constants/requests";
import { setLoading } from "../../../store/auth/authSlice";

export const STATUS_PUBLIC = "PUBLIC"
export const STATUS_PRIVATE = "PRIVATE"
export const useUsersInfo = () => {
    const [profileStatus, setSrofileStatus] = useState(STATUS_PUBLIC)
    const [isEditText, setIsEditText] = useState(false)
    const [headlineValue, setHeadlineValue] = useState(null)
    const [userInfo, setUserInfo] = useState({});
    // const [profileCompletness, setProfileCompletness]
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoading(true));
        instance
            .get(GET_USER_INFO)
            .then((response) => {
                dispatch(setLoading(false));
                setUserInfo(response.data);
            })
            .catch((err) => {
                dispatch(setLoading(false));
                console.log(err);
            });
    }, [dispatch]);

    useEffect(() => {
        if (userInfo.headline) {
            setHeadlineValue(userInfo.headline)
        }
        userInfo.profile_status && setSrofileStatus(userInfo.profile_status)
    }, [userInfo])

    return {
        headline: [headlineValue, setHeadlineValue],
        userInfo: userInfo,
        profileStatus: [profileStatus, setSrofileStatus],
        isEditText: [isEditText, setIsEditText]
    }
};