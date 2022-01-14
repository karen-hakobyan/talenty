import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Sign/SignUp.jsx";
import {
  FORGOT_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "./constants/routes";
import ForgotPassword from "./components/Sign/ForgotPassword.jsx";
import SignIn from "./components/Sign/SignIn.jsx";
import CvTemplateMain from "./components/CvTemplate/CvTemplateMain";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CvTemplateMain />} />
      <Route
        path={`${SIGN_UP_ROUTE}-company`}
        element={<SignUp isCompany={true} />}
      />
      <Route
        path={`${SIGN_UP_ROUTE}-user`}
        element={<SignUp isCompany={false} />}
      />

      <Route path={SIGN_IN_ROUTE} element={<SignIn />} />
      <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
