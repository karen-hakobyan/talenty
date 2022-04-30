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

const selectTemplateInitialData = state => state.globalData.templateInitialData

const selectTemplateList = state => state.globalData.templateList
const selectDataIsLoading = state => state.globalData.isLoading
const selectAnnoucementList = state => state.globalData.annoucementList

export {
    selectGlobalDataViaKey,
    selectLinksController,
    selectEvaluatesBarWidths,
    selectSectionContainerController,
    selectTemplateData,
    selectTemplateInitialData,
    selectTemplateList,
    selectDataIsLoading,
    selectAnnoucementList
};