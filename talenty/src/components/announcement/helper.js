export const validate = ({ name, value, maxLength, uppercase }) => {
    const regex = /^[A-Z]/
    if (uppercase && value && !regex.test(value)) {
        return {
            error: true,
            massage: "First letter should be uppercase",
        }
    }
    if (value && value.length - 1 > maxLength) {
        return {
            error: true,
            massage: `Max length ${name}`,
        }
    }
    return {
        error: false,
        massage: ""
    }
}
export const validationNumber = ({ from, to, maxLength, isValidetion }) => {
    console.log(maxLength, isValidetion)
    if (isValidetion === "from" && from && from.length - 1 > maxLength) {
        console.log(from.length - 1)
        return {
            positon: 'from',
            error: true,
            massage: "Max length",
        }
    }
    if (isValidetion === "to" && to && to.length - 1 > maxLength) {
        console.log(to.length - 1)
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


// error: true,
//             massage: "Max length "

// "First letter should be uppercase"