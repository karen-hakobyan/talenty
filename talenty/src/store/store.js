import {combineReducers, configureStore} from "@reduxjs/toolkit";
import dialogReducer from "../store/dialogs/slice";
import globalDataReducer from "../store/globalData/slice";
import isLoading from "./loader/slice"
import auth from './auth/authSlice'

const rootReducer = combineReducers({
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
const localStorageMiddleware = ({getState}) => {
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