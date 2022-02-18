import {createSlice} from "@reduxjs/toolkit";
import Registration from "./Registration";
import {HR_ROLE} from "../../constants/role";
import {SIGN_IN_ROUTE} from "../../constants/routes";

const initialState = {
    jwt: null,
    userInfo: null,
    isCompany: null,
    loading: false,
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
        setAuthInitialState: (state, {payload: navigate}) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            navigate(SIGN_IN_ROUTE)
        },

    },
    extraReducers: {
        [Registration.fulfilled]: (state, {payload: { jwtToken: jwt }}) => {
            state.jwt = jwt
            const userInfo = JSON.parse(atob(jwt.split(".")[1]))
            state.userInfo = userInfo
            state.isCompany = userInfo.role === HR_ROLE
            state.loading = false
        },
        [Registration.pending]: (state) => {
            state.loading = true
        },
        [Registration.rejected]: (state) => {
            state.loading = false
        }
    }
})

export default authSlice.reducer
export const {setAuthInitialState} = authSlice.actions
