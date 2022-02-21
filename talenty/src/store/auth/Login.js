import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance, LOGIN} from "../../constants/requests";

const Login = createAsyncThunk(
    'auth/Registration',
    async (payload, thunkAPI) => {
        try {
            let response = await instance.post(LOGIN, payload?.data)
            if(payload.isChecked) {
                localStorage.setItem('jwt', response.data.jwtToken)
            } else {
                sessionStorage.setItem('jwt', response.data.jwtToken)
            }
            return response.data
        } catch (err) {
            // console.log(err.response.data.errors[0], 'register error')
            return thunkAPI.rejectWithValue({})
        }
    }
)

export default Login