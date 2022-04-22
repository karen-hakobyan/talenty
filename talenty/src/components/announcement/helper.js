export const validate = ({ name, value, maxLength, uppercase }) => {
    const regex = /^[A-Z]/
    if (uppercase && regex.test(value)) {
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


// error: true,
//             massage: "Max length "

// "First letter should be uppercase"