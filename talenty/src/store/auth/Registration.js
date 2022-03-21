import {createAsyncThunk} from "@reduxjs/toolkit"
import {instance, POST_SIGN_UP_HR, POST_SIGN_UP_JOB_SEEKER} from "../../constants/requests"

const Registration = createAsyncThunk(
    'auth/Registration',
    async (payload, thunkAPI) => {
        try {
            const isCompany = payload.isCompany
            let response = await instance.post(isCompany ? POST_SIGN_UP_HR : POST_SIGN_UP_JOB_SEEKER, payload.data)
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err)
        }
    }
)

export default Registration