import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../constants/requests";
import {getJwt} from "../../components/dashboard/helper";
import {getUrls} from "../../request/get";
import {cleanTemplateNewIds} from "../../helpers/actions";

export const getTemplateActions = createAsyncThunk('globalData/getTemplateActions', async (_, thunkAPI) => {
    try {
        instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
        const response = await instance.get(getUrls['getTemplates'])
        console.log(response.data)
        return response.data
    } catch {
        console.log('error during get templates')
    }
})

export const saveJobSeekerCV = createAsyncThunk(
    'globalData/saveJobSeekerCV',
    async (templateData, thunkAPI) => {
        try {
            console.log(cleanTemplateNewIds(templateData))
            instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
            const response = await instance.post('templates/save_submitted_template', cleanTemplateNewIds(templateData))
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
)

export const createCvHR = createAsyncThunk('globalData/createHRCV', async (templateData, thunkAPI) => {
    try {
        instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
        const response = await instance.post('templates/create_new_template', templateData)
        console.log(response.data)
    } catch (err) {
        console.log(err)
    }
})

export const getJobAnnouncement = createAsyncThunk(
    'globalData/getJobAnnouncement',
    async (_, thunkAPI) => {
        try {
            const response = await instance.get('/job_announcements/system')
            return response.data
        } catch (error) {
            console.log('error during get announcements')
        }

    })