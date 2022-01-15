import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    actions: {},
    data: null,
};

export const dialogSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setDialogIsOpen: (state, { payload }) => {
            state.isOpen = payload;
        },
        setActions: (state, action) => {
            state.actions = action.payload;
        },
        setInitialState: (state) => {
            state = initialState;
        },
        setDialogData: (state, { payload }) => {
            state.data = payload;
        },
    },
});

export const {
    setComponentName,
    setInitialState,
    setDialogIsOpen,
    setDialogData,
} = dialogSlice.actions;

export default dialogSlice.reducer;