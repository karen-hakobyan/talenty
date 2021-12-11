import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CONFIRME_PASSWORD_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../../helpers/routes/routes";
import ConfirmPassword from "./ConfirmPassword";
import ForgotPassword from "./ForgotPassword";
import SignIn from "./SignIn";

function SingRoute() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path={SIGN_UP_ROUTE} element={<SignUp />} />
          <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />

          <Route path="sign-up-company" element={<SignUp isCompany={true} />} />
          <Route path="sign-up-user" element={<SignUp isCompany={false} />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default SingRoute;
