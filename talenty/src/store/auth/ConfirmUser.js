import { createAsyncThunk } from "@reduxjs/toolkit";
import { getConfirmUser, instance } from "../../constants/requests";

export const ConfirmUser = createAsyncThunk(
    "auth/ConfirmUser",
    async(payload, thunkAPI) => {
        try {
            let response = await instance.get(getConfirmUser(payload))
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue('err')
        }
    }
)