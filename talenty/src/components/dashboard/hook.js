import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    GET_COMPANY_INFO,
    GET_CONFIRM_ANNOUCEMENT,
    GET_PENDINGS_ANNOUCEMENT,
    GET_SELECT_LIST,
    instance,
} from "../../constants/requests";
import { setLoading } from "../../store/auth/authSlice";
import { changeInitialData, pendingDataChange } from "./helper";

export const useTableData = () => {
    const { pathname } = useLocation();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            dispatch(setLoading(true));
            await instance
                .get(
                    pathname.endsWith("current-jobs") ?
                    GET_CONFIRM_ANNOUCEMENT :
                    GET_PENDINGS_ANNOUCEMENT
                )
                .then((response) => {
                    setData(response.data);
                    dispatch(setLoading(false));
                })
                .catch((err) => {
                    dispatch(setLoading(false));
                });
        })();
    }, [dispatch, pathname]);
    if (pathname.endsWith("pending")) {
        return pendingDataChange(data);
    }
    return changeInitialData(data);
};

export const useSelectlist = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setLoading(true));
        instance
            .get(GET_SELECT_LIST)
            .then((response) => {
                console.log(response.data);
                setData(response.data)
                dispatch(setLoading(false));
            })
            .catch((err) => {
                console.log(err);
                dispatch(setLoading(false));
            });
    }, [dispatch]);
    return data
};
export const useHrProfaileUsersinfo = () => {
    const [data, setData] = useState({});
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setLoading(true))
        instance.get(GET_COMPANY_INFO)
            .then(response => {
                dispatch(setLoading(false))
                setData(response.data)
            })
            .catch(err => {
                dispatch(setLoading(false))
                console.log(err);
            })
    }, [])
    return data
}