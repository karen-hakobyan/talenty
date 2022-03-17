import axios from 'axios'
// const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:7800/";
export const baseUrl = "https://api.talenty.duckdns.org";
// export const baseUrl = "http://localhost:7800/";

export const instance = axios.create({
    baseURL: baseUrl
})

export const GET_TEMPLATES = `/templates/system`;
export const POST_SIGN_UP_HR = `/register/hr`;
export const POST_SIGN_UP_JOB_SEEKER = `/register/jobseeker`;
export const All_TEMPLATES = '/templates/all'
export const TEMPLATE_BY_ID = (id) => `/templates/template?id=${id}`
export const LOGIN = `/login`;
export const getForgotPassword = (email) => {
    return `/reset/password?email=${email}`
}
export const getValidateToken = (token) => {
    return `/token?token=${token}`
}
export const postChangePassword = (token) => `/reset/password?token=${token}`
export const getConfirmUser = (token) => `/confirm?token=${token}`