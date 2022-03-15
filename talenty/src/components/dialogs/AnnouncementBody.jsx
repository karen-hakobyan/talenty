import {Box, Button, Dialog, IconButton} from "@mui/material";
import {DIALOG_MAIN_CONTAINER, TEMPLATE_ITEM_BUTTON} from "../../shared/styles";
import {selectTemplateData} from "../../store/globalData/selector";
import {useSelector} from "react-redux";
import SharedTemplateHeader from "../../shared/components/TemplateHeader";
import {memo, useState} from "react";
import AddField from "./addField";
import Attention from "./attention";
import announcementTypes from "../announcement/announcementTypes";
import {AddFieldSVG} from "../../assets/icons/createTemplate";

export default function AnnouncementBody({
                                             dialogData,
                                             attentionIsOpen,
                                             setAttentionIsOpen,
                                         }) {
    const templateData = useSelector(selectTemplateData)
    const [addFieldIsOpen, setAddFieldIsOpen] = useState(false);
    if(!dialogData) {
        return null
    }
    return <Box sx={DIALOG_MAIN_CONTAINER}>
        <SharedTemplateHeader title={dialogData.name} />
        <Dialog
            open={addFieldIsOpen}
            onClose={() => setAddFieldIsOpen(false)}
            maxWidth={false}
        >
            <AddField dialogData={dialogData} setIsOpen={setAddFieldIsOpen}/>
        </Dialog>
        <Dialog open={attentionIsOpen} onClose={() => setAttentionIsOpen(false)}>
            <Attention {...{setAttentionIsOpen}} />
        </Dialog>

        <Box sx={{display: "grid", gap: "24px", pt: '44px'}}>
            {dialogData.fields.map(field => {
                let TempComponent = announcementTypes[field.metadata.type]
                if(!TempComponent) {
                    return null
                }
                TempComponent = memo(TempComponent)
                return <TempComponent data={field} key={field.name}/>
            })}
        </Box>
        <Box sx={{display: "flex", justifyContent: "flex-end", gap: "16px"}}>
            <IconButton
                sx={{...TEMPLATE_ITEM_BUTTON, width: "179px"}}
                onClick={() => {
                    setAddFieldIsOpen(true);
                }}
            >
                <AddFieldSVG/>
                Add field
            </IconButton>
            <Button
                sx={{
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
                }}
                style={{textTransform: "none"}}
            >
                Save
            </Button>
        </Box>
    </Box>
}