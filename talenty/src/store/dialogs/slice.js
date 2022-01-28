import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    actions: {},
    data: null,
    dialogType: null,
    isCompany: false,
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
        setIsCompany: (state, { payload }) => {
            state.isCompany = payload;
        },
        setDialogType: (state, { payload }) => {
            state.dialogType = payload;
        },
    },
});

export const {
    setComponentName,
    setInitialState,
    setDialogIsOpen,
    setDialogData,
    setDialogType,
    setIsCompany,
} = dialogSlice.actions;

export default dialogSlice.reducer;