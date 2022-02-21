import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, LOGIN } from "../../constants/requests";

const Registration = createAsyncThunk(
    'auth/Registration',
    async(data, thunkAPI) => {
        try {
            let response = await instance.post(LOGIN, data)
            return response.data
        } catch (err) {
            console.log(err.response.data.errors[0], 'register error')
            return thunkAPI.rejectWithValue()
        }
    }
)

export default Registration