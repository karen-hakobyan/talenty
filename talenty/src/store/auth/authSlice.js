import { createSlice } from "@reduxjs/toolkit";
import Login from "./Login";
import { HR_ROLE } from "../../constants/role";
import { LANDING_PAGE_ROUTE } from "../../constants/routes";
import Registration from "./Registration";
import { errorMessage } from "../../helpers/errorMessage";

const initialState = {
    jwt: null,
    userInfo: null,
    isCompany: null,
    loading: false,
    modalInfo: null,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsCompany: (state, { payload }) => {
            state.isCompany = payload
        },
        setUserInfo: (state, { payload }) => {
            state.userInfo = payload
        },
        setJwt: (state, { payload }) => {
            state.jwt = payload
        },
        setAuthInitialState: (state, { payload: navigate }) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            localStorage.clear()
            sessionStorage.clear()
            navigate && navigate(LANDING_PAGE_ROUTE)
        },
        setAuthModalInfo: (state, { payload }) => {
            state.modalInfo = payload
        },
    },
    extraReducers: {
        [Login.fulfilled]: (state, { payload: { jwtToken: jwt } }) => {
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
        [Login.rejected]: (state, { payload }) => {
            state.loading = false
        },
        [Registration.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.modalInfo = {
                ok: true,
                message: [
                    "Congratulations!!!",
                    "To confirm your registration, please check your email and confirm it within 2 days."
                ]
            }
        },
        [Registration.rejected]: (state, { payload }) => {
            state.loading = false
            state.modalInfo = {
                open: true,
                message: ["Registration failed.", errorMessage[payload.response.data.message]],
            }
        },
        [Registration.pending]: (state, ) => {
            state.loading = true

        },
    }
})

export default authSlice.reducer
export const { setAuthInitialState, setAuthModalInfo } = authSlice.actions