import { createAsyncThunk } from "@reduxjs/toolkit";
import { getValidateToken, instance, postChangePassword, } from "../../constants/requests";

export const ValidateToken = createAsyncThunk(
    'auth/Token',
    async(payload, thunkAPI) => {
        try {
            let response = await instance.get(getValidateToken(payload))
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue('barev')
        }
    }
)

export const ChangePassword = createAsyncThunk(
    'auth/changePassword',
    async(payload, thunkAPI) => {
        try {
            let response = await instance.post(postChangePassword(payload.token), payload.data)
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message)
        }
    }
)