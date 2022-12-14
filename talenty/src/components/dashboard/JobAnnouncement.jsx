import {useDispatch, useSelector} from "react-redux";
import {Box, Dialog, IconButton, Menu, MenuItem} from '@mui/material'
import {useEffect, useRef, useState} from "react";
import {getJobAnnouncement} from "../../store/globalData/getTemplateActions";
import {setAllTemplateData} from "../../store/globalData/slice";
import {selectTemplateData, selectTemplateList} from "../../store/globalData/selector";
import {TEMPLATE_BUTTON_ADD, TEMPLATE_BUTTON_CREATE} from "../../shared/styles";
import {ReactComponent as AttachCvIcon} from '../../assets/icons/attachments.svg'
import {AddSectionIconSVG} from '../../assets/icons/createTemplate'
import {ReactComponent as AnnouncementSVG} from "../../assets/icons/addAnnouncement.svg";
import Button from "../../shared/components/Button";
import TemplateItem from "../cvTemplate/TemplateItem";
import AddSection from "../dialogs/addSection";
import {PINK} from "../../style/colors";
import {setDialogIsOpen, setDialogType} from "../../store/dialogs/slice";

export default function JobAnnouncement() {
    const [isOpenMenuList, setIsOpenMenuList] = useState(false)
    const attachButton = useRef(null)
    const templateList = useSelector(selectTemplateList)
    const dispatch = useDispatch()
    const [addSectionDialogIsOpen, setAddSectionDialogIsOpen] = useState(false)
    const templateData = useSelector(selectTemplateData)
    useEffect(() => {
        dispatch(getJobAnnouncement())
        return () => {
            dispatch(setAllTemplateData(null))
        }
    }, [dispatch])

    if (!templateData) {
        return null
    }
    return (
        <Box sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: '24px 32px',
        }}>
            <Dialog
                open={addSectionDialogIsOpen}
                maxWidth={false}
                onClose={() => {
                    setAddSectionDialogIsOpen(false);
                }}
            >
                <AddSection
                    setIsOpen={setAddSectionDialogIsOpen}
                    setTemplateData={(data) => dispatch(setAllTemplateData(data))}
                    templateData={templateData}
                    withId
                />
            </Dialog>
            <Box sx={{
                display: 'flex',
                gap: '13px',
                fontSize: '20px',
                lineHeight: '20px',
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                alignItems: 'center',
                color: PINK,
            }}>
                <AnnouncementSVG/>
                Add new job
            </Box>
            {/* calc title bottom and also header action and padding top and bottom to give height 34 24 24 24 80 for header for now*/}
            <Box sx={{height: 'calc(100vh - 210px)', overflow: 'scroll', pb: '24px'}}>
                {templateData.fields.filter(el => el).map(el => {
                    if (el.metadata.status === "DELETED") {
                        return null
                    }
                    return <TemplateItem
                        key={el.name}
                        item={el}
                        setData={(data) => {
                            dispatch(setAllTemplateData(data))
                        }}
                        isAnnouncement
                        data={templateData}
                    />
                })}
            </Box>
            {/*below actions*/}
            <Box sx={{display: 'flex', mt: '24px'}}>
                {!!templateList?.length &&
                    <IconButton sx={TEMPLATE_BUTTON_ADD} ref={attachButton} onClick={() => setIsOpenMenuList(true)}>
                        <AttachCvIcon/>
                        {templateData?.attachedCvTemplateId ? templateList.find(el => el[0] === templateData?.attachedCvTemplateId)?.[1] || 'Attach CV template' : 'Attach CV template'}
                    </IconButton>}
                {!!templateList?.length &&
                    <Menu open={isOpenMenuList} anchorEl={attachButton.current} onClose={() => setIsOpenMenuList(false)}
                          anchorPosition={{top: 0, left: 0}}>
                        {templateList.map(el => {
                            return <MenuItem key={el[0]} onClick={() => {
                                dispatch(setAllTemplateData({...templateData, attachedCvTemplateId: el[0]}))
                                setIsOpenMenuList(false)
                            }}>{el[1]}</MenuItem>
                        })}
                    </Menu>}
                <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '16px'}}>
                    <IconButton sx={TEMPLATE_BUTTON_ADD} onClick={() => setAddSectionDialogIsOpen(true)}>
                        <AddSectionIconSVG/>
                        Add Section
                    </IconButton>
                    <Button sx={TEMPLATE_BUTTON_CREATE} onClick={() => {
                        dispatch(setDialogType('announcementPreview'))
                        dispatch(setDialogIsOpen(true))
                    }}>
                        Preview
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
