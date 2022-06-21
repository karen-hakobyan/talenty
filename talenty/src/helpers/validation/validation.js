import { changeDateFormat } from "../../components/job-seeker/createCvJobSeeker/typeComponents/sectionContainerTypes/DateSubSection"

export const validate = ({ name, value, maxLength, uppercase, isnumber, isEmail, isPhoneNumber, isURL, }) => {
    const regex = /^[A-Z]/
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const phoneRegex = /[+]\d{1,17}$/gm
    const URLRegex = /^(https?|ftp|file):[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/gm

    if (isURL && value && !URLRegex.test(value)) {
        return {
            error: true,
            massage: "Not corect URL"
        }
    }
    if (isPhoneNumber && value && !phoneRegex.test(value)) {
        return {
            error: true,
            massage: "Not corect phone number "
        }
    }
    if (isEmail && !emailRegex.test(value)) {
        return {
            error: true,
            massage: "Not correct email address",
        }
    }
    if (uppercase && value && !regex.test(value)) {
        return {
            error: true,
            massage: "First letter should be uppercase",
        }
    }
    if (isnumber && value && !Number.isInteger(+value)) {
        return {
            error: true,
            massage: "Enter an integer",
        }
    }
    if (value && value.length - 1 > maxLength) {
        let massageName = !name ? "URL" : name
        return {
            error: true,
            massage: `Max length ${massageName}`,
        }
    }
    return {
        error: false,
        massage: ""
    }
}
export const validationNumber = ({ from, to, maxLength, sectionValidetion, currency }) => {

    if (sectionValidetion === "from" && from && !Number.isInteger(+from)) {
        return {
            error: true,
            massage: "Enter an integer",
        }
    }
    if (sectionValidetion === "to" && to && !Number.isInteger(+to)) {
        return {
            error: true,
            massage: "Enter an integer",
        }
    }
    if (sectionValidetion === "from" && from && from.length > maxLength) {
        return {
            error: true,
            massage: "Max length",
        }
    }
    if (sectionValidetion === "to" && to && to.length > maxLength) {
        return {
            error: true,
            massage: "Max length",
        }
    }
    if ((to || from) && currency) {
        return {
            error: false,
            massage: ""
        }
    }

    if ((!to || !from) && currency) {
        return {
            error: true,
            massage: "Enter the amount of the salary",
        }
    }
    if (!currency && (to || from)) {
        return {
            error: true,
            massage: "Select currency",
        }
    }
    if (from && to && +from > +to) {
        return {
            error: true,
            massage: "Unanswered values"
        }
    }

    return {
        error: false,
        massage: ""
    }
}

export const validetionDate = ({ startValue, endValue, isStillWorking }) => {
    console.log(new Date(changeDateFormat(endValue)).getTime() >= new Date(changeDateFormat(startValue)))

    if (startValue && endValue && (new Date(changeDateFormat(endValue)).getTime() <= new Date(changeDateFormat(startValue)))) {
        return {
            error: true,
            massage: "Values ​​do not match"
        }
    }
    if (!startValue && endValue) {
        return {
            error: true,
            massage: "Also enter the start"
        }
    }
    if (isStillWorking && !startValue) {
        return {
            error: true,
            massage: "Enter when you started"
        }
    }
    return {
        error: false,
        massage: ""
    }
}

export const validationSalary = ({ valueSalary, currencyValue, }) => {
    if (valueSalary && !currencyValue) {
        return {
            error: true,
            massage: "Select currency"
        }
    }
    if (currencyValue && !valueSalary) {
        return {
            error: true,
            massage: "Enter the amount of the salary"
        }
    }
    return {
        error: false,
        massage: ""
    }
}

export const validetionType = (type) => {
    if (type === "text" || "url" || "social_link") {
        return false
    }
    return true
}
export const validetionURLType = (type) => {
    if (type === "url" || type === "social_link") {
        return true
    }
    return false
}