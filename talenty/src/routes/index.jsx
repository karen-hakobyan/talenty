import {useSelector} from "react-redux";
import {Routes, Route} from "react-router-dom";
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
import {HR_ROUTES, JOBSEEKER_ROUTES} from "./helper.js";
import NotFoundRoute from "../components/notMatchRoute/index.jsx";
import {selectAuthIsCompany} from "../store/auth/selector";

const RoutesMain = () => {
    let isCompany = useSelector(selectAuthIsCompany)

    return (
        <Routes>
            {isCompany === true
                ? HR_ROUTES.map((el) => <Route {...el} />)
                : null}
            {isCompany === false
                ? JOBSEEKER_ROUTES.map((el) => <Route {...el} />)
                : null}
            <Route
                path={`${SIGN_UP_ROUTE}`}
                element={<SignUp {...{isCompany}} />}
            />
            <Route path={SIGN_IN_ROUTE} element={<SignIn />}/>
            <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword/>}/>
            <Route path={LANDING_PAGE_ROUTE} element={<LandingPage/>}/>
            <Route path="*" element={<NotFoundRoute/>}/>
        </Routes>
    );
};

export default RoutesMain;
