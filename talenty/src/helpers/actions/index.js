import { DASHBOARD_ROUTE } from "../../constants/routes";

export function deleteFromTempleteById(templateData, id) {
    return JSON.parse(JSON.stringify(templateData), (key, value) => {
        if (value.id === id) {
            return undefined;
        }
        return value;
    });
}

export const checkNavigation = (navigate, route) => {
    if (!navigate) {
        return;
    }
    if (localStorage.getItem("jwt") || sessionStorage.getItem("jwt")) {
        navigate(DASHBOARD_ROUTE);
    } else if (route) {
        navigate(route);
    }
};