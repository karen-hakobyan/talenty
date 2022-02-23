import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    exactPage: 1,
};

export const globalDataSlice = createSlice({
    name: "globalData",
    initialState,
    reducers: {
        setGlobalDataViaKey: (state, {payload}) => {
            const {key, value} = payload;
            state[key] = value;
        },
        setInitialState: (state) => {
            state = initialState;
        },
        setNextPage: (state) => {
            state.exactPage = state.exactPage + 1
        },
        setPrevPage: (state) => {
            state.exactPage = state.exactPage - 1
        },
        setExactPage: (state, {payload}) => {
            state.exactPage = payload
        }
    },
});

export const {setInitialState, setGlobalDataViaKey,setNextPage,setPrevPage, setExactPage} = globalDataSlice.actions;

export default globalDataSlice.reducer;