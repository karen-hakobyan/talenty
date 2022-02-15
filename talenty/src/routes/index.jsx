import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/sign/SignUp.jsx";
import {
  FORGOT_PASSWORD_ROUTE,
  LANDING_PAGE_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../constants/routes";
import ForgotPassword from "../components/sign/ForgotPassword.jsx";
import SignIn from "../components/sign/SignIn.jsx";
import LandingPage from "../components/landingPage";
import { selectIsCompany } from "../store/dialogs/selector.js";
import { HR_ROLE } from "../constants/role.js";
import { HR_ROUTES } from "./helper.js";
import { parseJWt } from "../helpers/jwt.js";
import { useState } from "react";

const RoutesMain = () => {
  const isCompany = useSelector(selectIsCompany);
  let [userInfo, setUserInfo] = useState(parseJWt());

  return (
    <Routes>
      {userInfo?.role === HR_ROLE
        ? HR_ROUTES.map((el) => <Route {...el} />)
        : null}
      <Route
        path={`${SIGN_UP_ROUTE}`}
        element={<SignUp {...{ isCompany }} />}
      />
      <Route path={SIGN_IN_ROUTE} element={<SignIn {...{ setUserInfo }} />} />
      <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route path={LANDING_PAGE_ROUTE} element={<LandingPage />} />
    </Routes>
  );
};

export default RoutesMain;
