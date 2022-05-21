import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {Box, Dialog} from '@mui/material'
import DialogAnnouncement from "./DialogAnnouncement";
import JobSeekerContainer from "../../shared/JobSeekerContainer";
import AnnouncementPreview from "../../dialogs/announcementPreview/AnnouncementPreview";
import Button from "../../../shared/components/Button";
import {useGetAnnouncementData} from "../hook";
import {TEMPLATE_BUTTON_CREATE} from "../../../shared/styles";
import {applyInProgress} from "../request";

export const DetailAnnouncementContext = React.createContext()

export default function DetailAnnouncement() {
    const {announcementId} = useParams()
    const announcementInfo = useGetAnnouncementData(announcementId)
    const [isOpenAnnouncementApplyingDialog, setIsOpenAnnouncementApplyDialog] = useState(false)
    console.log(announcementInfo)
    return <JobSeekerContainer>
        <Box sx={{display: 'flex', alignItems: 'flex-end', flexDirection: 'column'}}>
            <DetailAnnouncementContext.Provider
                value={{
                    setOpen: setIsOpenAnnouncementApplyDialog,
                    viewData: announcementInfo,
                    announcementId,

                }}>
                <AnnouncementPreview/>
                {/* send announcement info which include current announcement name and also company name for future cv creation*/}
                <Dialog open={isOpenAnnouncementApplyingDialog} onClose={() => setIsOpenAnnouncementApplyDialog(false)}>
                    <DialogAnnouncement
                        setOpen={setIsOpenAnnouncementApplyDialog}
                        companyName={announcementInfo?.companyName}
                        announcementName={announcementInfo.name}
                    />
                </Dialog>
            </DetailAnnouncementContext.Provider>
            <Button sx={{...TEMPLATE_BUTTON_CREATE, width: '179px'}} onClick={() => {
                applyInProgress(setIsOpenAnnouncementApplyDialog, announcementId)
            }}>APPLY NOW</Button>
        </Box>
    </JobSeekerContainer>
}