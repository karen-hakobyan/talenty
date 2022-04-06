import {selectTemplateData} from "../../../store/globalData/selector";
import {Box, Button, Dialog} from '@mui/material'
import {useDispatch, useSelector} from "react-redux";
import GeneralInfoAnnouncement from "./GeneralInfo";
import VacancyDetails from "./VacancyDetails";
import Skill from "./Skills";
import {TEMPLATE_ITEM_BUTTON} from "../../../shared/styles";
import {setDialogInitialState} from "../../../store/dialogs/slice";
import {isRequiredFieldsFilled} from "../../../helpers/dialog";
import {useCallback} from "react";
import {getJobAnnouncement, publishJobAnnouncement} from "../../../store/globalData/getTemplateActions";
import {setIsPublished} from "../../../store/globalData/slice";

const activeButtonStyle = {
    ...TEMPLATE_ITEM_BUTTON,
    width: "179px",
    color: "#FFFFFF",
    "&:hover": {
        background: "#8C0DF0",
    },
    "&.Mui-disabled": {
        background: "#9F9F9F",
    },
    background: "#8C0DF0",
}

export default function AnnouncementPreview() {
    const isPublished = useSelector(state => state.globalData.isPublished)
    const data = useSelector(selectTemplateData)
    const dispatch = useDispatch()
    const closePublishDialog = useCallback(() => {
        if (isPublished?.status === 'ok') {
            dispatch(setDialogInitialState())
            dispatch(getJobAnnouncement())
        }
        dispatch(setIsPublished({}))
    }, [dispatch, isPublished])
    return <Box sx={{width: '1142px', padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: '68px'}}>
        <Box>
            {
                data.fields.filter(el => el.metadata.status !== 'DELETED').map(field => {
                    switch (field.name) {
                        case 'General Information': {
                            return <GeneralInfoAnnouncement data={field} key={field.id}/>
                        }
                        case 'Vacancy details': {
                            return <VacancyDetails data={field} key={field.id}/>
                        }
                        case 'Skills': {
                            return <Skill data={field} key={field.id}/>
                        }
                        default: {
                            return <VacancyDetails data={field} key={field.id}/>
                        }
                    }
                })
            }
        </Box>
        <Dialog open={isPublished?.open} onClose={() => closePublishDialog()} maxWidth={false}>
            <Box
                sx={{
                    width: '400px',
                    height: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: '24px',
                }}
            >
                <Box sx={{flex: 1, display: 'flex', alignItems: 'center', fontFamily: 'Proxima Nova'}}>
                    {isPublished?.status === 'ok' ? "Congratulations your announcement was published" : 'Something went wrong'}
                </Box>
                <Button
                    sx={activeButtonStyle}
                    style={{textTransform: 'none'}}
                    onClick={() => closePublishDialog()}
                >
                    Ok
                </Button>
            </Box>
        </Dialog>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: '24px'}}>
            <Button style={{textTransform: 'none'}} sx={{
                width: '179px',
                color: '#8C0DF0',
                border: '1px solid #8C0DF0',
                height: '34px',
            }}
                    onClick={() => {
                        dispatch(setDialogInitialState())
                    }}
            >
                Cancel
            </Button>
            <Button
                sx={activeButtonStyle}
                style={{textTransform: "none"}}
                disabled={!isRequiredFieldsFilled(data)}
                onClick={() => {
                    dispatch(publishJobAnnouncement(data))
                }}
            >
                Publish
            </Button>
        </Box>
    </Box>
}