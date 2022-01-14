import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    actions: {},
    componentName: null,
};

export const dialogSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        openDialog: (state) => {
            state.isOpen = true;
        },
        closeDialog: (state) => {
            state.isOpen = false;
        },
        setComponentName: (state, action) => {
            state.componentName = action.payload;
        },
        setActions: (state, action) => {
            state.actions = action.payload;
        },
    },
});

export const { openDialog, closeDialog, setComponentName, setActions } =
dialogSlice.actions;
export default dialogSlice.reducer;