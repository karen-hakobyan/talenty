import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { USER_INFO } from "../../constants/redux/globalData";
import { LANDING_PAGE_ROUTE } from "../../constants/routes";
import { checkNavigation } from "../../helpers/actions";
import { selectGlobalDataViaKey } from "../../store/globalData/selector";
import { setGlobalDataViaKey } from "../../store/globalData/slice";
import Header from "./Header";
import { getJwt } from "./helper";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(selectGlobalDataViaKey(USER_INFO));

  useEffect(() => {
    checkNavigation(navigate, LANDING_PAGE_ROUTE, true);
    let jwt = getJwt();
    let dataInfo = jwt ? JSON.parse(atob(jwt.split(".")[1])) : false;
    if (dataInfo) {
      dispatch(setGlobalDataViaKey({ key: USER_INFO, value: dataInfo }));
    }
    // TODO orient with above comment
  }, [navigate, dispatch]);

  if (!userInfo) {
    return null;
  }

  return (
    <Box>
      <Header />
      {/* body */}
      <Box sx={{ display: "flex" }}>
        <Box>navigation</Box>
        <Box>
          <Routes>
            <Route path="/" element={<h1>andranik</h1>} />
            <Route path="andrey" element={<h1>andrey</h1>} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}
