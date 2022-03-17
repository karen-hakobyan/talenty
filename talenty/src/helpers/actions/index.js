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
    if (value.includes(' ')) {
        return false
    }
    if (value[0] === '+') {
        let temp = +value.substring(1, value.length)
        return !isNaN(temp)
    }
    let temp = +value
    return !isNaN(temp)
}
export const isValidRationalNumber = value => {
    if (value.includes(' ') || value === '0') {
        return false
    }
    return !isNaN(+value)
}
export const cleanTemplateNewIds = (data) => {
    let result = JSON.stringify(data)
    result = JSON.parse(result, (key, reviver) => {
        if (!reviver?.id) {
            return reviver
        }
        return (
            {
                ...(reviver.id.startsWith('0') ? {} : {id: reviver.id}),
                ...(reviver.fields ? {fields: [...reviver.fields]} : {}),
                ...(!reviver.fields && reviver.metadata.submitted_value ? {metadata: {submitted_value: reviver.metadata.submitted_value}} : {metadata: {}})
            }
        )
    })
    return result
}
