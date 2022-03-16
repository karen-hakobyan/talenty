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

export default function Dialogs() {
    const dispatch = useDispatch();
    const dialogType = useSelector(selectDialogType);
    const isDialogOpen = useSelector(selectDialogIsOpen);
    const dialogData = useSelector(selectDialogData);
    const dialogInitialData = useSelector(selectDialogInitialData);
    const [attentionIsOpen, setAttentionIsOpen] = useState(false);
    const isAuthLoading = useSelector(selectAuthLoading)
    console.log(dialogType)
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
            onClose={dialogType === "body" ? () => {
                if (isDialogDataInitial(dialogData, dialogInitialData)) {
                    dispatch(setDialogInitialState());
                } else {
                    setAttentionIsOpen(true);
                }
            } : () => dispatch(setDialogInitialState())}
            maxWidth={false}
            sx={{borderRadius: "16px"}}
        >
            {isAuthLoading ? 'loading...' : <TempComponent {...tempComponentInfo.props} />}
        </Dialog>
    );
}
