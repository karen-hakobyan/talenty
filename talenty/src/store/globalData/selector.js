const selectGlobalDataViaKey = (key) => {
    return (state) => {
        return state.globalData[key];
    };
};
const selectLinksController = (state) => {
    return state.globalData.linksController
}

export {selectGlobalDataViaKey,selectLinksController};