import {createSlice} from "@reduxjs/toolkit";
import Login from "./Login";
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
        [Login.fulfilled]: (state, {payload: { jwtToken: jwt }}) => {
            state.jwt = jwt
            const userInfo = JSON.parse(atob(jwt.split(".")[1]))
            state.userInfo = userInfo
            state.isCompany = userInfo.role === HR_ROLE
            state.loading = false
        },
        [Login.pending]: (state) => {
            console.log('pending')
            state.loading = true
        },
        [Login.rejected]: (state, {payload}) => {
            state.loading = false
            console.log(payload)
        }
    }
})

export default authSlice.reducer
export const {setAuthInitialState} = authSlice.actions
