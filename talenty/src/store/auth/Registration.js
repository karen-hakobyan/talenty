import {createAsyncThunk} from "@reduxjs/toolkit";
import {LOGIN, instance} from "../../constants/requests";

const Registration = createAsyncThunk(
    'auth/Registration',
    async (data, thunkAPI) => {
        try {
            return console.log({name: 'Sanasar experimental', surname: 'azganun'})
            // const response = await instance.get(LOGIN, data)
        } catch (err) {
            console.log(err.response.data.errors[0], 'register error')
            return thunkAPI.rejectWithValue(err.response.data.errors[0])
        }
    }
)

export default Registration