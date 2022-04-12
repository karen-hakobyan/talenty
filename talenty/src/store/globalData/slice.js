import {createSlice} from "@reduxjs/toolkit";
import {
    createCvHR,
    getJobAnnouncement,
    getTemplateActions,
    getTemplateById,
    getTemplateLists, publishJobAnnouncement
} from "./getTemplateActions";
import changeTemplateData, {
    addSectionContainer,
    deleteAddSectionContainer, deletePublications
} from "../../components/createCvJobSeeker/actions";
import {jobAnnouncementAjab} from "../../ajab";

const initialState = {
    exactPage: 1,
    templateInitialData: null,
    templateList: [],
    templateData: null,
    linksController: null,
    evaluateWidths: null,
    // bellow state is for Shushan's unimplementable logic dude
    // maybe object that have sections controller's parents name and some index which will control decreasing height
    // pritom piti chlini miamit personal skill proffesional skill u language for publications it will be another story :D 
    sectionContainerController: null,
    isPublished: {},
};

export const globalDataSlice = createSlice({
    name: "globalData",
    initialState,
    reducers: {
        setGlobalDataViaKey: (state, {payload}) => {
            const {key, value} = payload;
            state[key] = value;
        },
        setNextPage: (state) => {
            state.exactPage = state.exactPage + 1
        },
        setPrevPage: (state) => {
            state.exactPage = state.exactPage - 1
        },
        setExactPage: (state, {payload}) => {
            state.exactPage = payload
        },
        setTemplateData: (state, {payload: {id, value}}) => {
            state.templateData = changeTemplateData(state.templateData, id, value)
        },
        addSectionContainerAction: (state, {payload: id}) => {
            state.templateData = addSectionContainer(state.templateData, id)
        },
        addPublicationsSection: (state, {payload: {id, isBook}}) => {
            state.templateData = addSectionContainer(state.templateData, id, isBook)
        },
        setGlobalInitialData: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            localStorage.clear()
            sessionStorage.clear()
        },
        setLinksController: (state, {payload}) => {
            state.linksController = payload
        },
        setEvaluateWidths: (state, {payload}) => {
            state.evaluateWidths = payload
        },
        setSectionContainerController: (state, {payload}) => {
            state.sectionContainerController = payload
        },
        setDeleteAddSection: (state, {payload}) => {
            state.templateData = deleteAddSectionContainer(payload)
        },
        setAllTemplateData: (state, {payload}) => {
            state.templateData = payload
        },
        setIsPublished: (state, {payload}) => {
            state.isPublished = payload
        },
        deletePublicationAction: (state, {payload}) => {
            state.templateData = deletePublications({templateData: state.templateData, id: payload})
        },
    },
    extraReducers: {
        [getTemplateActions.fulfilled]: (state, {payload}) => {
            state.templateData = payload
            state.templateInitialData = payload
        },
        [getJobAnnouncement.fulfilled]: (state, {payload}) => {
            state.templateData = payload
        },
        [getJobAnnouncement.rejected]: (state) => {
            console.log('hasav rejectedi mot')
            state.templateData = jobAnnouncementAjab
        },
        [createCvHR.fulfilled]: (state, {payload}) => {
            state.templateData = null;
            state.templateList = payload
        },
        [getTemplateLists.fulfilled]: (state, {payload}) => {
            state.templateList = payload
        },
        [getTemplateLists.rejected]: state => {
            state.templateList = []
        },
        [getTemplateById.fulfilled]: (state, {payload}) => {
            state.templateData = payload
            state.templateInitialData = payload
        },
        [publishJobAnnouncement.fulfilled]: (state, {payload}) => {
            console.log(payload)
            console.log('mtav publish announcement fullfilled')
            state.isPublished = {open: true, status: 'ok'}
        },
        [publishJobAnnouncement.rejected]: (state, {payload}) => {
            console.log('announcement publish rejected')
            state.isPublished = {open: true, status: 'rejected'}
        }
    }
});

export const {
    setInitialState,
    setGlobalDataViaKey,
    setNextPage,
    setPrevPage,
    setExactPage,
    setTemplateData,
    setGlobalInitialData,
    setLinksController,
    addSectionContainerAction,
    setEvaluateWidths,
    setSectionContainerController,
    addPublicationsSection,
    setDeleteAddSection,
    setAllTemplateData,
    setIsPublished,
    deletePublicationAction,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;