export const selectAuthLoading = state => state.auth.loading

export const selectAuthJwt = (state) => state.auth.jwt

export const selectAuthUserInfo = (state) => state.auth.userInfo

export const selectAuthIsCompany = (state) => state.auth.isCompany

export const selectAuthModalInfo = state => state.auth.modalInfo

export const selectIsValidToken = state => state.auth.isValidToken

export const selectIsChangePassword = state => state.auth.isChangePassword

export const selectIsResetPassword = state => state.auth.isResetPassword