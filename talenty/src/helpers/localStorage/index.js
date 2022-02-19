export const localStorageSetter = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const localStorageGetter = (key) => {
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return false;
};
