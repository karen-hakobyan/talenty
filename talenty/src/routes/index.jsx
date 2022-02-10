import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/sign/SignUp.jsx";
import {
  DASHBOARD_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  LANDING_PAGE_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  TEMPLATE_ROUTE,
} from "../constants/routes";
import ForgotPassword from "../components/sign/ForgotPassword.jsx";
import SignIn from "../components/sign/SignIn.jsx";
import CvTemplateMain from "../components/cvTemplate/CvTemplateMain";
import LandingPage from "../components/landingPage";
import { selectIsCompany } from "../store/dialogs/selector.js";
import Dashboard from "../components/dashboard/index.jsx";

const RoutesMain = () => {
  const isCompany = useSelector(selectIsCompany);
  return (
    <Routes>
      <Route>
        <Route path={`${DASHBOARD_ROUTE}/*`} element={<Dashboard />} />
      </Route>
      <Route path={LANDING_PAGE_ROUTE} element={<LandingPage />} />
      <Route path={TEMPLATE_ROUTE} element={<CvTemplateMain />} />
      <Route
        path={`${SIGN_UP_ROUTE}`}
        element={<SignUp {...{ isCompany }} />}
      />
      <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
      <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
    </Routes>
  );
};

export default RoutesMain;
