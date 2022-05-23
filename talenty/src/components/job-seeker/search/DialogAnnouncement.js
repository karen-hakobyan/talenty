import {useMemo, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Box, Dialog} from "@mui/material";
import {JOBS_TITLE} from "../../../style/texts";
import Button from "../../../shared/components/Button";
import {TEMPLATE_BUTTON_ADD, TEMPLATE_BUTTON_CREATE} from "../../../shared/styles";
import {selectAuthUserInfo} from "../../../store/auth/selector";
import {instance, JOB_SEEKER_APPLY_ANNOUNCEMENT} from "../../../constants/requests";

export default function DialogAnnouncement({setOpen, announcementName, companyName}) {
    const navigate = useNavigate()
    const [isApplied, setIsApplied] = useState(false)
    const {announcementId} = useParams()
    const userInfo = useSelector(selectAuthUserInfo)
    const text = useMemo(() => {
        return userInfo.cvTemplateId ? 'Do you want to send your profile CV for this job?' : 'Do you want to fill your profile CV template?'
    }, [userInfo])
    return <Box
        sx={{
            width: '600px',
            height: '400px',
            p: '24px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
        }}
    >
        <Dialog open={isApplied} onClose={() => {
            navigate('/home-page/search')
        }}>
            <Box sx={{
                width: '600px',
                height: '400px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Box>thank you for applying {companyName}</Box>
                <Box>{announcementName} you have applied</Box>
                <Button
                    sx={{TEMPLATE_BUTTON_CREATE}}
                    onClick={() => {
                        // dispatch(setDialogInitialState())
                        navigate('/home-page/search')
                    }}
                >
                    ok
                </Button>
            </Box>
        </Dialog>
        <Box sx={{...JOBS_TITLE, textAlign: 'center'}}>{text}</Box>
        <Box sx={{display: 'flex'}}>
            <Button sx={{...TEMPLATE_BUTTON_ADD, width: '179px'}} onClick={() => setOpen(false)}>No</Button>
            <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                <Button sx={{...TEMPLATE_BUTTON_CREATE, width: '179px'}} onClick={async () => {
                    if (!userInfo.cvTemplateId) {
                        navigate('/home-page/create-cv', {
                            state: {
                                announcementId,
                                announcementName,
                                companyName
                            }
                        })
                    } else {
                        await instance.post(JOB_SEEKER_APPLY_ANNOUNCEMENT, {
                            ownerId: userInfo.id,
                            jobAnnouncementId: announcementId,
                            submittedCvTemplateId: userInfo.cvTemplateId
                        }).then(() => {
                            setIsApplied(true)
                        })
                    }
                }}>Yes</Button>
                {userInfo.cvTemplateId && <Button
                    sx={{...TEMPLATE_BUTTON_CREATE, width: '179px'}}
                    onClick={() => {
                        navigate('/home-page/create-cv', {
                            state: {
                                announcementId,
                                announcementName,
                                companyName
                            }
                        })
                    }}>I need changes</Button>}
            </Box>
        </Box>
    </Box>
}