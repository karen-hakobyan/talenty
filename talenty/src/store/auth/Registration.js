import { createAsyncThunk } from "@reduxjs/toolkit"
import { instance, POST_SIGN_UP_HR, POST_SIGN_UP_JOB_SEEKER } from "../../constants/requests"

const Registration = createAsyncThunk(
    'auth/Registration',
    async(payload, thunkAPI) => {
        try {
            const isCompany = payload.isCompany
            let response = await instance.post(isCompany ? POST_SIGN_UP_HR : POST_SIGN_UP_JOB_SEEKER, payload.data)
            console.log(response.data)
            return response.data
        } catch (err) {
            // console.log(err.response.data.errors[0], 'register error')
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export default Registration