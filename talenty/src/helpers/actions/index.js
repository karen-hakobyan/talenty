import {getJwt} from "../../components/dashboard/helper";
import {LANDING_PAGE_ROUTE} from "../../constants/routes";

export function deleteFromTempleteById(templateData, id) {
    return JSON.parse(JSON.stringify(templateData), (key, value) => {
        if (value.id === id) {
            return undefined;
        }
        return value;
    });
}

export const checkUserExistence = (navigate) => {
    if (!navigate) {
        return null;
    }
    if (!getJwt()) {
        navigate(LANDING_PAGE_ROUTE);
    }
};

export const isValidPhoneNumber = (value) => {
    if(value.includes(' ')){
        return false
    }
    if(value[0] === '+') {
        let temp = +value.substring(1, value.length)
        return !isNaN(temp)
    }
    let temp = +value
    return !isNaN(temp)
}
