import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
};

export const isLoading = createSlice({
    name: "isLoading",
    initialState,
    setIsLoading: (state, { payload }) => {
        state.isLoading = payload
    }
})


export const {
    setIsLoading
} = isLoading.actions;

export default isLoading.reducer;