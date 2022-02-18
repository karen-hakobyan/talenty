import {createSlice} from "@reduxjs/toolkit";
import Registration from "./Registration";

const initialState = {
    jwt: null,
    userInfo: null,
    isCompany: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsCompany: (state, {payload}) => {
            state.isCompany = payload
        },
        setUserInfo: (state, {payload}) => {
            state.userInfo = payload
        },
        setJwt: (state, {payload}) => {
            state.jwt = payload
        },
        setInitialState: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
        }
    },
    extraReducers: {
        [Registration.fulfilled]: () => {
            console.log('fulfilled is working as expected')
        }
    }
})

export default authSlice.reducer