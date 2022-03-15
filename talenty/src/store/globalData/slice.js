import { createSlice } from "@reduxjs/toolkit";
import { getTemplateActions } from "./getTemplateActions";
import changeTemplateData, { addSectionContainer, deleteAddSectionContainer } from "../../components/createCvJobSeeker/actions";

const initialState = {
    exactPage: 1,
    templateInitialData: null,
    templateData: null,
    linksController: null,
    evaluateWidths: null,
    // bellow state is for Shushan's unimplementable logic dude
    // maybe object that have sections controller's parents name and some index which will control decreasing height
    // pritom piti chlini miamit personal skill proffesional skill u language for publications it will be another story :D 
    sectionContainerController: null,
};

export const globalDataSlice = createSlice({
    name: "globalData",
    initialState,
    reducers: {
        setGlobalDataViaKey: (state, { payload }) => {
            const { key, value } = payload;
            state[key] = value;
        },
        setNextPage: (state) => {
            state.exactPage = state.exactPage + 1
        },
        setPrevPage: (state) => {
            state.exactPage = state.exactPage - 1
        },
        setExactPage: (state, { payload }) => {
            state.exactPage = payload
        },
        setTemplateData: (state, { payload: { id, value } }) => {
            state.templateData = changeTemplateData(state.templateData, id, value)
        },
        addSectionContainerAction: (state, { payload: id }) => {
            state.templateData = addSectionContainer(state.templateData, id)
        },
        addPublicationsSection: (state, { payload: { id, isBook } }) => {
            state.templateData = addSectionContainer(state.templateData, id, isBook)
        },
        setGlobalInitialData: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            localStorage.clear()
            sessionStorage.clear()
        },
        setLinksController: (state, { payload }) => {
            state.linksController = payload
        },
        setEvaluateWidths: (state, { payload }) => {
            state.evaluateWidths = payload
        },
        setSectionContainerController: (state, { payload }) => {
            state.sectionContainerController = payload
        },
        setDeleteAddSection: (state, { payload }) => {
            state.templateData = deleteAddSectionContainer(payload)
        },
        setAllTemplateData: (state, { payload }) => {
            state.templateData = payload
        }
    },
    extraReducers: {
        [getTemplateActions.fulfilled]: (state, { payload }) => {
            state.templateData = payload
        },
        [getJobAnnouncement.fulfilled]: (state, { payload }) => {
            state.templateData = payload
        },
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
    setAllTemplateData
} = globalDataSlice.actions;

export default globalDataSlice.reducer;