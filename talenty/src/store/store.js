import {combineReducers, configureStore} from "@reduxjs/toolkit";
import signUpReducer from "../features/signUp/signUpSlicer";
import dialogReducer from "../store/dialogs/slice";
import globalDataReducer from "../store/globalData/slice";
import isLoading from "./loader/slice"
import auth from './auth/slice'

const rootReducer = combineReducers({
    signUp: signUpReducer,
    dialogs: dialogReducer,
    globalData: globalDataReducer,
    isLoading,
    auth,
})
const reHydrateStore = () => {
    if (localStorage.getItem('applicationState') !== null) {
        return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the index
    }
};
const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        localStorage.setItem('applicationState', JSON.stringify(getState()));
        return result;
    };
};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
});