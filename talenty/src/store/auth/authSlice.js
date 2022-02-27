import { createSlice } from "@reduxjs/toolkit";
import Login from "./Login";
import { HR_ROLE } from "../../constants/role";
import Registration from "./Registration";
import { errorMessage } from "../../helpers/errorMessage";
import ResetPassword from "./ResetPassword";

const initialState = {
    jwt: null,
    userInfo: null,
    isCompany: null,
    loading: false,
    modalInfo: null,
    signOut: false,
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
        setAuthInitialState: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            localStorage.clear()
            sessionStorage.clear()
            state.signOut = true
        },
        setAuthModalInfo: (state, { payload }) => {
            state.modalInfo = payload
        },
        setAuthSignOut: (state, { payload }) => {
            state.signOut = payload
        }
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
        [Login.rejected]: (state) => {
            state.modalInfo = 'Your email or password is incorrect, please try again.'
            state.loading = false
        },
        [Registration.fulfilled]: (state) => {
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
        [Registration.pending]: (state) => {
            console.log("pending");
            state.loading = true
        },
        [ResetPassword.pending]: (state) => {
            state.loading = true

        },
        [ResetPassword.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.modalInfo = "Check your email"
            console.log("fulfilled");
        },
        [ResetPassword.rejected]: (state, { payload }) => {
            console.log("rejected");
            state.loading = false
            state.modalInfo = errorMessage[payload.response.data.message]
        },
    }
})

export default authSlice.reducer
export const { setAuthInitialState, setAuthModalInfo, setAuthSignOut } = authSlice.actions