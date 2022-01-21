export const compareObjects = (firstObject, secondObject) => {
    if (!firstObject || !secondObject) {
        return true;
    }
    return JSON.stringify(firstObject) === JSON.stringify(secondObject);
};