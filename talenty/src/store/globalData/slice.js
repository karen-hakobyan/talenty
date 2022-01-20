import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const globalDataSlice = createSlice({
    name: "globalData",
    initialState,
    reducers: {
        setGlobalDataViaKey: (state, { payload }) => {
            const { key, value } = payload;
            state[key] = value;
        },
        setInitialState: (state) => {
            state = initialState;
        },
    },
});

export const { setInitialState, setGlobalDataViaKey } = globalDataSlice.actions;

export default globalDataSlice.reducer;