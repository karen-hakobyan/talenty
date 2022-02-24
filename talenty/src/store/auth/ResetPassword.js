import { createAsyncThunk } from "@reduxjs/toolkit";
import { getForgotPassword, instance } from "../../constants/requests";

const ResetPassword = createAsyncThunk('auth/ResetPassword', async(payload, thunkAPI) => {
    let response
    try {
        response = await instance.get(getForgotPassword(payload))
    } catch (err) {
        return thunkAPI.rejectWithValue({})
    }
    return response.data
})

export default ResetPassword