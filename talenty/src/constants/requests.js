import axios from 'axios'
// const baseUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:7800/";
export const baseUrl = "https://api.talenty.duckdns.org";

export const instance = axios.create({
    baseURL: baseUrl
})

export const GET_TEMPLATES = ``;
export const POST_SIGN_UP_HR = `/register/hr`;
export const POST_SIGN_UP_JOB_SEEKER = `/register/jobseeker`;
export const LOGIN = `/login`;
export const getForgotPassword = (email) => {
    return `reset/password?email=${email}`
}