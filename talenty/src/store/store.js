import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlicer";

export const store = configureStore({
    reducer: {
        signUp: signUpReducer,
    },
});