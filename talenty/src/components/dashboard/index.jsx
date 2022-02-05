import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_INFO } from "../../constants/redux/globalData";
import { LANDING_PAGE_ROUTE } from "../../constants/routes";
import { checkNavigation } from "../../helpers/actions";
import { selectGlobalDataViaKey } from "../../store/globalData/selector";
import { setGlobalDataViaKey } from "../../store/globalData/slice";
import { getJwt } from "./helper";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectGlobalDataViaKey(USER_INFO));

  useEffect(() => {
    checkNavigation(navigate, LANDING_PAGE_ROUTE);
    let dataInfo = JSON.parse(atob(getJwt().split(".")[1]));
    dispatch(setGlobalDataViaKey({ key: USER_INFO, value: dataInfo }));
  }, [navigate, dispatch]);

  console.log(userInfo);
  return (
    <Box>
      {/* header */}
      <Box>header</Box>

      {/* body */}
      <Box>body</Box>
    </Box>
  );
}
