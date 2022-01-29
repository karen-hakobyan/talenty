import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/Sign/SignUp.jsx";
import {
  FORGOT_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
  TEMPLATE,
} from "../constants/routes";
import ForgotPassword from "../components/Sign/ForgotPassword.jsx";
import SignIn from "../components/Sign/SignIn.jsx";
import CvTemplateMain from "../components/CvTemplate/CvTemplateMain";
import LandingPage from "../components/landingPage";
import { selectIsCompany } from "../store/dialogs/selector.js";

const RoutesMain = () => {
  const isCompany = useSelector(selectIsCompany);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path={TEMPLATE} element={<CvTemplateMain />} />
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
