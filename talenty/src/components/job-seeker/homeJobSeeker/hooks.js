import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GET_USER_INFO, instance } from "../../../constants/requests";
import { setLoading } from "../../../store/auth/authSlice";

export const useUsersInfo = () => {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      await instance
        .get(GET_USER_INFO)
        .then((response) => {
          dispatch(setLoading(false));
          setUserInfo(response.data);
        })
        .catch((err) => {
          dispatch(setLoading(false));
          console.log(err);
        });
    })();
  }, [dispatch]);
  return userInfo;
};
