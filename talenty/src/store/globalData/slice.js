import {createSlice} from "@reduxjs/toolkit";
import {getTemplate} from "./getTemplate";
import changeTemplateData from "../../components/createCvJobSeeker/actions";

const initialState = {
    exactPage: 1,
    templateInitialData: null,
    templateData: null,
    linksController: null,
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
        setGlobalInitialData: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            localStorage.clear()
            sessionStorage.clear()
        },
        setLinksController: (state, {payload}) => {
            state.linksController = payload
        }
    },
    extraReducers: {
        [getTemplate.fulfilled]: (state, {payload}) => {
            state.templateData = payload
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
    setLinksController
} = globalDataSlice.actions;

export default globalDataSlice.reducer;