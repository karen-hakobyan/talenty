const selectGlobalDataViaKey = (key) => {
    return (state) => {
        return state.globalData[key];
    };
};
const selectLinksController = (state) => {
    return state.globalData.linksController
}
const selectEvaluatesBarWidths = state => state.globalData.evaluateWidths

export {selectGlobalDataViaKey, selectLinksController, selectEvaluatesBarWidths};