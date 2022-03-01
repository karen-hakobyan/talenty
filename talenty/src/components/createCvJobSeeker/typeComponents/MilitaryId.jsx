import {useDispatch} from "react-redux";
import {Box, Radio} from '@mui/material'
import JobSeekerSubsection from "../JobSeekerSubsection";
import {setTemplateData} from "../../../store/globalData/slice";
import {RADIO_LABEL} from "../style";

export default function MilitaryId({data}) {
    const dispatch = useDispatch()
    return <JobSeekerSubsection
        label={data.name}
        Component={
            <Box sx={{width: '500px', display: 'flex'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Radio
                        checked={data.metadata.submitted_value === true}
                        onChange={() => {
                            dispatch(setTemplateData({id: data.id, value: true}))
                        }}
                    />
                    <Box
                        sx={
                            {
                                ...RADIO_LABEL,
                                color: data.metadata.submitted_value === true ? '#8C0DF0' : '#636366',
                            }
                        }
                    >
                        Yes
                    </Box>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Radio
                        checked={data.metadata.submitted_value === false}
                        onChange={() => {
                            dispatch(setTemplateData({id: data.id, value: false}))
                        }}
                    />
                    <Box
                        sx={
                            {
                                ...RADIO_LABEL,
                                color: data.metadata.submitted_value === false ? '#8C0DF0' : '#636366',
                            }
                        }
                    >
                        No
                    </Box>
                </Box>
            </Box>
        }
    />
}