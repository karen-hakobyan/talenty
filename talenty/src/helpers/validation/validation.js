export const validate = ({ name, value, maxLength, uppercase, isnumber, isEmail }) => {
    const regex = /^[A-Z]/
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
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
export const validationNumber = ({ from, to, maxLength, isValidetion }) => {
    if (isValidetion === "from" && from && !Number.isInteger(+from)) {
        return {
            positon: 'from',
            error: true,
            massage: "Enter an integer",
        }
    }
    if (isValidetion === "to" && to && !Number.isInteger(+to)) {
        return {
            positon: 'to',
            error: true,
            massage: "Enter an integer",
        }
    }
    if (isValidetion === "from" && from && from.length > maxLength) {
        return {
            positon: 'from',
            error: true,
            massage: "Max length",
        }
    }
    if (isValidetion === "to" && to && to.length > maxLength) {
        return {
            positon: 'to',
            error: true,
            massage: "Max length",
        }
    }
    if (from && to && +from > +to) {
        return {
            positon: 'fromAndTo',
            error: true,
            massage: "Unanswered values"
        }
    }

    return {
        positon: "",
        error: false,
        massage: ""
    }
}

export const validetionDate = ({ startValue, endValue, isStillWorking }) => {

    if (startValue && endValue) {
        const [deyStart, monstsStart, yearStart] = startValue.split("/")
        const [deyEnd, monstsEnd, yearEnd] = endValue.split("/")
        if (+yearEnd < +yearStart) {
            return {
                error: true,
                massage: "The years entered do not coincide"
            }
        }
        if (+monstsEnd < +monstsStart) {
            return {
                error: true,
                massage: "The incoming months do not coincide"
            }
        }
        if (+deyEnd < +deyStart) {
            return {
                error: true,
                massage: "The days of entry do not coincide"
            }
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

export const validetionType = (type) => {
    if (type === "text" || "url" || "social_link") {
        return false
    }
    return true
}