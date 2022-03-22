import {Dialog} from "@mui/material";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    selectDialogData, selectDialogInitialData, selectDialogIsOpen, selectDialogType,
} from "../../store/dialogs/selector";
import {setDialogInitialState} from "../../store/dialogs/slice";
import isDialogDataInitial from "./helper";
import {dialogTypes} from "./type";
import {selectAuthLoading} from "../../store/auth/selector";
import {ATTENTION_TYPES} from "./constants";
import Loading from "../../assets/loading/load.gif"
import { Box } from "@mui/system";

export default function Dialogs() {
    const dispatch = useDispatch();
    const dialogType = useSelector(selectDialogType);
    const isDialogOpen = useSelector(selectDialogIsOpen);
    const dialogData = useSelector(selectDialogData);
    const dialogInitialData = useSelector(selectDialogInitialData);
    const [attentionIsOpen, setAttentionIsOpen] = useState(false);
    const isAuthLoading = useSelector(selectAuthLoading)
    const tempComponentInfo = useMemo(() => {
        return dialogType ? dialogTypes[dialogType]({
            dialogData, setAttentionIsOpen, attentionIsOpen, dialogInitialData,
        }) : {
            component: () => {
            }
        };
    }, [dialogType, attentionIsOpen, dialogData, dialogInitialData]);

    const TempComponent = useMemo(() => {
        return tempComponentInfo.component;
    }, [tempComponentInfo]);

    if (!isDialogOpen && !isAuthLoading) {
        attentionIsOpen && setAttentionIsOpen(false);
        return null;
    }
    if (!dialogType && !isAuthLoading) {
        return null;
    }

    return (
        <Dialog
            open={true}
            onClose={ATTENTION_TYPES.includes(dialogType) ? () => {
                if (isDialogDataInitial(dialogData, dialogInitialData)) {
                    dispatch(setDialogInitialState());
                } else {
                    setAttentionIsOpen(true);
                }
            } : () => dispatch(setDialogInitialState())}
            maxWidth={false}
            sx={{borderRadius: "16px"}}
        >
            {isAuthLoading ? <Box sx={{
                background:"#000"

            }}>
                <img style={{
                        // width: "100px",
                        // height: "100px"
                }}   src={Loading}  />
            </Box> : <TempComponent {...tempComponentInfo.props} />}
        </Dialog>
    );
}
