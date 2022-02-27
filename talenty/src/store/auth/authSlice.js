import { createSlice } from "@reduxjs/toolkit";
import Login from "./Login";
import { HR_ROLE } from "../../constants/role";
import Registration from "./Registration";
import { errorMessage } from "../../helpers/errorMessage";
import ResetPassword from "./ResetPassword";
import ValidateToken from "./ChangePassword";
import ChangePassword from "./ChangePassword";

const initialState = {
    jwt: null,
    userInfo: null,
    isCompany: null,
    loading: false,
    modalInfo: null,
    signOut: false,
    isValidToken: null,
    isChnagePassword: null
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
            state.loading = false
            state.modalInfo = errorMessage[payload]
        },
        [ValidateToken.panding]: (state) => {
            state.loading = true
        },
        [ValidateToken.fulfilled]: (state) => {
            state.isValidToken = true
            state.loading = false
        },
        [ValidateToken.rejected]: (state, { payload }) => {
            state.isValidToken = false
            state.loading = false
        },
        [ChangePassword.panding]: (state) => {
            state.loading = true
        },
        [ChangePassword.fulfilled]: (state) => {
            state.loading = false
            state.isChnagePassword = true
        },
        [ChangePassword.rejected]: (state, { payload }) => {
            state.loading = false
            state.isChnagePassword = false
        }
    }
})

export default authSlice.reducer
export const { setAuthInitialState, setAuthModalInfo, setAuthSignOut } = authSlice.actions