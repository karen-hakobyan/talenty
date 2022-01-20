export function deleteFromTempleteById(templateData, id) {
    return JSON.parse(JSON.stringify(templateData), (key, value) => {
        if (value.id === id) {
            return undefined;
        }
        return value;
    });
}