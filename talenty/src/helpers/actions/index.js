import {getJwt} from "../../components/dashboard/helper";
import {ROLE_BASE_NAVIGATION} from "../../constants/role";
import {LANDING_PAGE_ROUTE} from "../../constants/routes";

export function deleteFromTempleteById(templateData, id) {
    return JSON.parse(JSON.stringify(templateData), (key, value) => {
        if (value.id === id) {
            return undefined;
        }
        return value;
    });
}

export const checkNavigation = (navigate, route, isFromDashboard) => {
    if (!navigate) {
        return;
    }
    let jwt = getJwt();
    let userInfo = jwt ? JSON.parse(atob(jwt.split(".")[1])) : {};
    if (jwt) {
        if (!isFromDashboard) {
            navigate(ROLE_BASE_NAVIGATION[userInfo.role]);
        }
    } else if (route) {
        navigate(route);
    }
};

export const checkUserExistence = (navigate) => {
    if (!navigate) {
        return null;
    }
    if (!getJwt()) {
        navigate(LANDING_PAGE_ROUTE);
    }
};
