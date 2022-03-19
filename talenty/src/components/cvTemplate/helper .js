export const notValidTemplateName = ["systemtemplate", "templatesystem"]
export const isValidTemplateName = (arr, name, notValidTemplateNames) => {
    let validInfo = true;
    let result = name.replaceAll(' ', '').toLocaleLowerCase()
    if (notValidTemplateNames.includes(result) || name === "") {
        return false
    }
    arr.forEach(([, el]) => {
        if (el === name) {
            validInfo = false
        }
    })
    return validInfo
}