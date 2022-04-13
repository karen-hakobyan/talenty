import {createAsyncThunk} from "@reduxjs/toolkit";
import {instance} from "../../constants/requests";
import {getJwt} from "../../components/dashboard/helper";
import {getUrls} from "../../request/get";
import {cleanHrTemplateNewIds, cleanTemplateNewIds} from "../../helpers/actions";

export const getTemplateActions = createAsyncThunk('globalData/getTemplateActions', async (_, thunkAPI) => {
    try {
        instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
        const response = await instance.get(getUrls['getTemplates'])
        return response.data
    } catch {
        console.log('error during get templates')
    }
})

export const getTemplateLists = createAsyncThunk(
    'globalData/getTemplateLists',
    async (_, thunkAPI) => {
        try {
            instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
            const response = await instance.get(getUrls.templateList)
            return Object.entries(response.data)
        } catch (err) {
            console.log(err)
        }
    }
)

export const getTemplateById = createAsyncThunk(
    'globalData/getTemplateById',
    async (id, thunkAPI) => {
        try {
            console.log('hasav by id')
            instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
            const response = await instance.get(getUrls.templateById(id))
            return response.data
        } catch (err) {
            console.log('error during get template by id')
        }
    }
)
export const getEditedUserCv = createAsyncThunk(
    'globalData/getEditedUserCv',
    async (id) => {
        try {
            instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
            const response = await instance.get(getUrls.userEditedCV(id))
            return response.data
        } catch (err) {
            console.log('error during get user edited cv')
        }
    },
)
export const saveJobSeekerCV = createAsyncThunk(
    'globalData/saveJobSeekerCV',
    async (templateData, thunkAPI) => {
        try {
            instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
            const response = await instance.post('/cv_template/save_submitted', cleanTemplateNewIds(templateData))
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)
export const editJobSeekerCv = createAsyncThunk(
    'globalData/editJobSeekerCv',
    async (templateData) => {
        try {
            instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
            const response = await instance.post('/cv_template/edit', cleanTemplateNewIds(templateData))
        } catch (err) {
            console.log('error during edit cv template jobSeeker')
        }

    },
)

export const createCvHR = createAsyncThunk('globalData/createHRCV', async (templateData, thunkAPI) => {
    try {
        instance.defaults.headers = {Authorization: `Bearer ${getJwt()}`}
        const response = await instance.post('cv_template/create_new', cleanHrTemplateNewIds(templateData))
        return Object.entries(response.data)
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
            console.log(thunkAPI)
            console.log('error during get announcements')
            return thunkAPI.rejectWithValue()
        }

    })

export const publishJobAnnouncement = createAsyncThunk('globalData/publishJobAnnouncement', async (data, thunkAPI) => {
    try {
        const response = await instance.post('/job_announcements/publish', data)
        return response.data
    } catch (err) {
        console.log('announcment publish something went wrong issues')
        return thunkAPI.rejectWithValue('something went wrong')
    }
})