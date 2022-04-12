import {memo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Dialog, IconButton} from "@mui/material";
import {DIALOG_MAIN_CONTAINER, TEMPLATE_ITEM_BUTTON} from "../../shared/styles";
import SharedTemplateHeader from "../../shared/components/TemplateHeader";
import AddField from "./addField";
import Attention from "./attention";
import announcementTypes from "../announcement/announcementTypes";
import {AddFieldSVG} from "../../assets/icons/createTemplate";
import {selectTemplateData} from "../../store/globalData/selector";
import {onSave} from "./Body";
import {isRequiredFieldsFilled} from "../../helpers/dialog";
import {compareObjects} from "../../helpers/compareTwoData";


const restrictedAddFieldSections = ['General Information', 'Skills']
export default function AnnouncementBody({
                                             dialogData,
                                             attentionIsOpen,
                                             setAttentionIsOpen,
                                         }) {
    const [addFieldIsOpen, setAddFieldIsOpen] = useState(false);
    const dispatch = useDispatch()
    const templateData = useSelector(selectTemplateData)
    if (!dialogData) {
        return null
    }
    return <Box sx={DIALOG_MAIN_CONTAINER}>
        <SharedTemplateHeader title={dialogData.name}/>
        <Dialog
            open={addFieldIsOpen}
            onClose={() => setAddFieldIsOpen(false)}
            maxWidth={false}
        >
            <AddField dialogData={dialogData} setIsOpen={setAddFieldIsOpen} withId/>
        </Dialog>
        <Dialog open={attentionIsOpen} onClose={() => setAttentionIsOpen(false)}>
            <Attention {...{setAttentionIsOpen}} />
        </Dialog>

        <Box sx={{display: "grid", gap: "24px", pt: '44px'}}>
            {dialogData.fields.map(field => {
                if (field.name === 'Deadline') {
                    return null
                }
                let TempComponent = announcementTypes[field.metadata.type]
                if (!TempComponent) {
                    return null
                }
                return <TempComponent data={field} key={field.name}/>
            })}
        </Box>
        <Box sx={{display: "flex", justifyContent: "flex-end", gap: "16px", pt: '44px'}}>
            {!restrictedAddFieldSections.includes(dialogData.name) && <IconButton
                sx={{...TEMPLATE_ITEM_BUTTON, width: "179px"}}
                onClick={() => {
                    setAddFieldIsOpen(true);
                }}
            >
                <AddFieldSVG/>
                Add field
            </IconButton>}
            <Button
                sx={{
                    ...TEMPLATE_ITEM_BUTTON,
                    textTransform: "none",
                    width: "179px",
                    color: "#FFFFFF",
                    "&:hover": {
                        background: "#8C0DF0",
                    },
                    "&.Mui-disabled": {
                        background: "#9F9F9F",
                    },
                    background: "#8C0DF0",
                }}
                style={{textTransform: "none"}}
                disabled={!isRequiredFieldsFilled(dialogData)}
                onClick={() => {
                    onSave({dispatch, dialogData, templateData});
                }}
            >
                Save
            </Button>
        </Box>
    </Box>
}

// export default memo(AnnouncementBody, (prev, next) => {
//     return JSON.stringify(prev) !== JSON.stringify(next)
// })
