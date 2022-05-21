import {useEffect, useState} from "react";
import {Box, Dialog} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {RIGHT_TYPES} from "./typesPerName";
import {useDispatch, useSelector} from "react-redux";
import {TEMPLATE_BUTTON_ADD, TEMPLATE_BUTTON_CREATE} from "../../../../shared/styles";
import {cleanTemplateNewIds} from "../../../../helpers/actions";
import {editJobSeekerCv, saveJobSeekerCV} from "../../../../store/globalData/getTemplateActions";
import Button from "../../../../shared/components/Button";
import {selectTemplateData} from "../../../../store/globalData/selector";
import {setDialogInitialState} from "../../../../store/dialogs/slice";
import {MAIN_PURPLE} from "../../../../style/colors";
import {instance, JOB_SEEKER_APPLY_ANNOUNCEMENT} from "../../../../constants/requests";
import {selectAuthUserInfo} from "../../../../store/auth/selector";

export default function Right({data}) {
    const [isApplyingAnnouncement, setIsApplyingAnnouncement] = useState(false)
    const [isOpenApplyingDialog, setIsOpenApplyingDialog] = useState(false)
    const dispatch = useDispatch()
    const templateData = useSelector(selectTemplateData)
    const userInfo = useSelector(selectAuthUserInfo)
    const navigate = useNavigate()
    const {state} = useLocation()
    useEffect(() => {
        if (isApplyingAnnouncement) {
            (async () => {
                // body:{ownerId,jobAnnouncementId, submittedCvTemplateId}
                await instance.post(JOB_SEEKER_APPLY_ANNOUNCEMENT, {
                    ownerId: userInfo.id,
                    jobAnnouncementId: state?.announcementId,
                    submittedCvTemplateId: userInfo.cvTemplateId
                }).then(() => {
                    setIsOpenApplyingDialog(true)
                })
            })()
        }

    }, [state, isApplyingAnnouncement, userInfo])
    return <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        {/*below dialog's reason inform jobSeeker about aplying to announcement */}
        {state && <Dialog open={isOpenApplyingDialog}>
            <Box sx={{
                width: '600px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>{state.companyName}</Box>
                <Box>{state.announcementName} you have applied</Box>
                <Button
                    sx={{TEMPLATE_BUTTON_CREATE}}
                    onClick={() => {
                        dispatch(setDialogInitialState())
                        navigate('/home-page/search')
                    }}
                >
                    ok
                </Button>
            </Box>
        </Dialog>}
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            {
                data.map(el => {
                    let TempComponent = RIGHT_TYPES[el.name]
                    if (!TempComponent) {
                        return null
                    }
                    return <TempComponent key={el.id} data={el}/>
                })
            }
        </Box>
        <Box sx={{flex: 1}}/>
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
            <Box sx={{display: 'flex', gap: '24px'}}>
                <Button
                    sx={{...TEMPLATE_BUTTON_ADD, color: MAIN_PURPLE, width: '179px'}}
                    onClick={() => {
                        dispatch(setDialogInitialState())
                    }}
                >
                    Cancel
                </Button>
                <Button
                    sx={{...TEMPLATE_BUTTON_CREATE, color: "white", width: '179px'}}
                    onClick={async () => {
                        const data = cleanTemplateNewIds(templateData)
                        await dispatch(userInfo.cvTemplateId ? editJobSeekerCv({
                            data,
                            parentId: templateData.parentId
                        }) : saveJobSeekerCV(data))
                        if (state?.announcementId) {
                            console.log('mtav state is announcmeent id')
                            setIsApplyingAnnouncement(true)
                        } else {
                            dispatch(setDialogInitialState())
                            navigate('/')
                        }
                    }}
                >
                    {userInfo?.cvTemplateId ? 'Edit' : 'Save'}
                </Button>
            </Box>
        </Box>
    </Box>
}