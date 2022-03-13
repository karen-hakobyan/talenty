const selectGlobalDataViaKey = (key) => {
    return (state) => {
        return state.globalData[key];
    };
};
const selectLinksController = (state) => {
    return state.globalData.linksController
}
const selectEvaluatesBarWidths = state => state.globalData.evaluateWidths

const selectSectionContainerController = (state) => state.globalData.sectionContainerController

const selectTemplateData = (state) => state.globalData.templateData

export {
    selectGlobalDataViaKey,
    selectLinksController,
    selectEvaluatesBarWidths,
    selectSectionContainerController,
    selectTemplateData
};