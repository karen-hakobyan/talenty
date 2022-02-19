import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {DASHBOARD_ROUTE, HOME_PAGE_ROUTE, LANDING_PAGE_ROUTE} from "../../constants/routes";
import {selectAuthIsCompany} from "../../store/auth/selector";

export default function NotFoundRoute() {
    const navigate = useNavigate()
    const isCompany = useSelector(selectAuthIsCompany)
    useEffect(() => {
        if(isCompany === null) {
            navigate(LANDING_PAGE_ROUTE)
        } else if(isCompany) {
            navigate(DASHBOARD_ROUTE)
        } else {
            navigate(HOME_PAGE_ROUTE)
        }

    },[navigate, isCompany])

    return null;
}
