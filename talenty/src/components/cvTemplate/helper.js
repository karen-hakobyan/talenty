export const notValidTemplateName = ["systemtemplate", "templatesystem"]
export const isValidTemplateName = (arr, name, notValidTemplateNames, templateId) => {
    let validInfo = true;
    let result = name.replaceAll(' ', '').toLocaleLowerCase()
    if (notValidTemplateNames.includes(result) || name === "") {
        return false
    }
    arr.forEach(([id, el]) => {
        if (el === name && id !== templateId) {
            validInfo = false
        }
    })
    return validInfo
}