import {useDispatch, useSelector} from "react-redux";
import {Box, Dialog, IconButton} from '@mui/material'
import {useEffect, useState} from "react";
import {getJobAnnouncement} from "../../store/globalData/getTemplateActions";
import {setAllTemplateData} from "../../store/globalData/slice";
import {selectTemplateData} from "../../store/globalData/selector";
import {TEMPLATE_BUTTON_ADD, TEMPLATE_BUTTON_CREATE} from "../../shared/styles";
import {ReactComponent as AttachCvIcon} from '../../assets/icons/attachments.svg'
import {AddSectionIconSVG} from '../../assets/icons/createTemplate'
import Button from "../../shared/components/Button";
import TemplateItem from "../cvTemplate/TemplateItem";
import AddSection from "../dialogs/addSection";

export default function JobAnnouncement() {
    const dispatch = useDispatch()
    const [addSectionDialogIsOpen, setAddSectionDialogIsOpen] = useState(true)
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
        <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', p: '24px 32px'}}>
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
                />
            </Dialog>
            {templateData.fields.map(el => {
                if (el.metadata.status === "DELETED") {
                    return null
                }
                return <TemplateItem
                    key={el.name}
                    item={el}
                    setData={(data) => {
                        dispatch(setAllTemplateData(data))
                    }}
                    sAnnouncement
                    data={templateData}
                />
            })}
            <Box sx={{flex: 1}}/>
            {/*below actions*/}
            <Box sx={{display: 'flex'}}>
                <IconButton sx={TEMPLATE_BUTTON_ADD}>
                    <AttachCvIcon/>
                    Attach CV template
                </IconButton>
                <Box sx={{flex: 1, display: 'flex', justifyContent: 'flex-end', gap: '16px'}}>
                    <IconButton sx={TEMPLATE_BUTTON_ADD}>
                        <AddSectionIconSVG/>
                        Add Section
                    </IconButton>
                    <Button sx={TEMPLATE_BUTTON_CREATE}>
                        Publish
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}