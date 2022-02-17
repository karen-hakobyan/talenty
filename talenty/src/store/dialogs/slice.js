import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    actions: {},
    data: null,
    initialData: null,
    dialogType: null,
    isCompany: false,
};

export const dialogSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setDialogIsOpen: (state, {payload}) => {
            state.isOpen = payload;
        },
        setActions: (state, action) => {
            state.actions = action.payload;
        },
        setDialogInitialState: (state) => {
            state.data = null;
            state.isOpen = false;
            state.actions = {};
            state.dialogType = null;
            state.initialData = null;
        },
        setDialogData: (state, {payload}) => {
            state.data = payload;
        },
        setIsCompany: (state, {payload}) => {
            state.isCompany = payload;
        },
        setDialogType: (state, {payload}) => {
            state.dialogType = payload;
        },
        setDialogInitialData: (state, {payload}) => {
            state.initialData = payload;
        },
    },
});

export const {
    setComponentName,
    setDialogInitialState,
    setDialogIsOpen,
    setDialogData,
    setDialogType,
    setIsCompany,
    setDialogInitialData,
} = dialogSlice.actions;

export default dialogSlice.reducer;
