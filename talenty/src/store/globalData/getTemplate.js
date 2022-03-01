import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../constants/requests";
import {getJwt} from "../../components/dashboard/helper";
import {getUrls} from "../../request/get";

export const getTemplate = createAsyncThunk('globalData/getTemplate', async(_,thunkAPI) => {
    try {
        instance.defaults.headers = { Authorization: `Bearer ${getJwt()}` }
        const response = await instance.get(getUrls['getTemplates'])
        console.log(response.data)
        return response.data
    } catch {
        console.log('error during get templates')
    }
})