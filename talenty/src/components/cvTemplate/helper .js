export const notValidTemplateName = ["systemtemplate", "templatesystem"]
export const isValidTemplateName = (arr, name, notValidTemplateNames) => {
    let validInfo = true;
    if (name === "") {
        return false
    }
    if (notValidTemplateNames.includes(name)) {
        return false
    }
    if (name.includes(" ")) {
        let result = name.replaceAll(' ', '').toLocaleLowerCase()
        if (notValidTemplateNames.includes(result)) {
            return false
        }
    }

    arr.forEach(([, el]) => {
        if (el === name) {
            validInfo = false
        }
    })
    return validInfo
}