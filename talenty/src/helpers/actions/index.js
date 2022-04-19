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
    // clean upper sections that do not have fields totally
    let temp = {
        ...data,
        fields: data.fields.filter(el => el.fields.length)
    }
    let result = JSON.stringify(temp)
    result = JSON.parse(result, (key, reviver) => {
        if (!reviver?.id) {
            return reviver
        }
        let metadata = {}
        if (!reviver.fields && reviver.metadata.submitted_value) {
            metadata.submitted_value = reviver.metadata.submitted_value
        }
        if (reviver.metadata?.status) {
            metadata.status = reviver.metadata.status
            metadata.type = reviver.metadata.type
        }
        if (reviver.metadata?.inside_container) {
            metadata.inside_container = true
        }

        return ({
            metadata,
            ...(reviver.id.startsWith('0') ? {name: reviver.name} : {id: reviver.id}),
            ...(reviver.fields ? {fields: [...reviver.fields]} : {}),
        })
    })
    return result
}
export const cleanHrTemplateNewIds = data => {
    let result = JSON.stringify(data)
    result = JSON.parse(result, (_, reviverValue) => {
        if (!reviverValue?.id) {
            return reviverValue
        }
        return ({
            ...(reviverValue.id.startsWith('0') ? {} : {id: reviverValue.id}),
            ...(reviverValue.fields ? {fields: [...reviverValue.fields]} : {}),
            metadata: reviverValue.metadata,
            name: reviverValue.name
        })
    })
    return result
}