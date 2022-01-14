import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlicer";
import dialogReducer from "../store/dialogs/slice";

export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        dialogs: dialogReducer,
    },
});