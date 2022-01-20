const selectGlobalDataViaKey = (key) => {
    return (state) => {
        return state.globalData[key];
    };
};

export { selectGlobalDataViaKey };