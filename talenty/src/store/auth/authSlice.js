import {createSlice} from "@reduxjs/toolkit";
import Login from "./Login";
import {HR_ROLE} from "../../constants/role";
import Registration from "./Registration";
import {ERROR_MESSAGE} from "../../helpers/ERROR_MESSAGE";
import ResetPassword from "./ResetPassword";
import {ValidateToken, ChangePassword} from "./ChangePassword";
import {ConfirmUser} from "./ConfirmUser";

const initialState = {
    jwt: null,
    userInfo: null,
    isCompany: null,
    loading: false,
    modalInfo: null,
    signOut: false,
    isValidToken: null,
    isChangePassword: null,
    isResetPassword: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, {payload}) => {
            state.loading = payload
        },
        setIsCompany: (state, {payload}) => {
            state.isCompany = payload
        },
        setUserInfo: (state, {payload}) => {
            state.userInfo = payload
        },
        setJwt: (state, {payload}) => {
            state.jwt = payload
            state.userInfo = JSON.parse(atob(payload.split(".")[1]))
        },
        setAuthInitialState: (state) => {
            for (let key in initialState) {
                state[key] = initialState[key]
            }
            localStorage.clear()
            sessionStorage.clear()
            state.signOut = true
        },
        setAuthModalInfo: (state, {payload}) => {
            state.modalInfo = payload
        },
        setAuthSignOut: (state, {payload}) => {
            state.signOut = payload
        },
        setAuthIsChangePass: (state) => {
            state.isChangePassword = null
        },
        setAuthIsResetPassword: (state) => {
            state.isResetPassword = false
        },
        setIsValidToken: (state, {payload}) => {
            state.isValidToken = payload
        },
        setIsLoading: (state, {payload}) => {
            state.loading = payload
        }
    },
    extraReducers: {
        [Login.fulfilled]: (state, {payload: {jwtToken: jwt}}) => {
            state.jwt = jwt
            const userInfo = JSON.parse(atob(jwt.split(".")[1]))
            state.userInfo = userInfo
            state.isCompany = userInfo.role === HR_ROLE
            state.loading = false
        },
        [Login.pending]: (state) => {
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
        [Registration.rejected]: (state, {payload}) => {
            state.loading = false
            state.modalInfo = {
                open: true,
                message: ["Registration failed.", ERROR_MESSAGE[payload]],
            }
        },
        [Registration.pending]: (state) => {
            state.loading = true
        },
        [ResetPassword.pending]: (state) => {
            state.loading = true
        },
        [ResetPassword.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.isResetPassword = true
            state.modalInfo = "Check your email"
        },
        [ResetPassword.rejected]: (state, {payload}) => {
            state.loading = false
            state.modalInfo = ERROR_MESSAGE[payload]
        },
        [ValidateToken.pending]: (state) => {
            state.loading = true
        },
        [ValidateToken.fulfilled]: (state) => {
            state.isValidToken = true
            state.loading = false
        },
        [ValidateToken.rejected]: (state, {payload}) => {
            state.isValidToken = false
            state.loading = false
        },
        [ChangePassword.pending]: (state) => {
            state.loading = true
        },
        [ChangePassword.fulfilled]: (state) => {
            state.loading = false
            state.isChangePassword = true
        },
        [ChangePassword.rejected]: (state, {payload}) => {
            state.loading = false
            state.isChangePassword = false
        },
        [ConfirmUser.pending]: (state) => {
            state.loading = true
        },
        [ConfirmUser.fulfilled]: (state) => {
            state.loading = false
            state.isValidToken = true
        },
        [ConfirmUser.rejected]: (state) => {
            state.loading = false
            state.isValidToken = false
        }
    }
})

export default authSlice.reducer
export const {
    setLoading,
    setAuthInitialState,
    setAuthModalInfo,
    setAuthSignOut,
    setAuthIsChangePass,
    setAuthIsResetPassword,
    setIsValidToken,
    setJwt,
    setIsLoading
} = authSlice.actions