import {Box, Button, Dialog, IconButton} from "@mui/material";
import {memo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddFieldSVG} from "../../assets/icons/createTemplate";
import {
    TEMPLATE_DATA,
} from "../../constants/redux/globalData";
import {
    DIALOG_MAIN_CONTAINER,
    TEMPLATE_ITEM_BUTTON,
} from "../../shared/styles";
import {setDialogIsOpen} from "../../store/dialogs/slice";
import {selectGlobalDataViaKey} from "../../store/globalData/selector";
import {setAllTemplateData} from "../../store/globalData/slice";
import typeComponents from "../cvTemplate/typeComponents";
import AddField from "./addField";
import Attention from "./attention";
import SharedTemplateHeader from "../../shared/components/TemplateHeader";

export default function Body({
                                 dialogData,
                                 attentionIsOpen,
                                 setAttentionIsOpen,
                             }) {
    const dispatch = useDispatch();
    const [addFieldIsOpen, setAddFieldIsOpen] = useState(false);
    const templateData = useSelector(selectGlobalDataViaKey(TEMPLATE_DATA));
    if (!dialogData) {
        return null;
    }

    return (
        <Box sx={DIALOG_MAIN_CONTAINER}>
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

            <SharedTemplateHeader title={dialogData.name}/>
            <Box sx={{display: "grid", gridTemplateColumns: "auto", gap: "24px", pt: '44px'}}>
                {dialogData.fields.map((field) => {

                    let TempComponent = typeComponents[field.metadata.type];
                    if (!TempComponent) {
                        return <h1>they have changed again some type</h1>;
                    }
                    TempComponent = memo(TempComponent);

                    return (
                        field.metadata.status !== 'DELETED' &&
                        <TempComponent
                            data={field}
                            key={field.name}
                            {...{dialogData, dispatch, templateData}}
                        />
                    );
                })}

                {/* section adding part */}
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
                        onClick={() => {
                            onSave({dispatch, dialogData, templateData});
                        }}
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
        </Box>
    );
}

export function onSave({dialogData, dispatch, templateData}) {
    const result = JSON.parse(JSON.stringify(templateData), (key, value) => {
        if (!value?.id) {
            return value;
        }
        if (value.id === dialogData.id) {
            return dialogData;
        } else {
            return value;
        }
    });
    dispatch(setAllTemplateData(result))
    dispatch(setDialogIsOpen(false));
}
