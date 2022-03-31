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
import {Box} from "@mui/system";
import Loading from "../../assets/loading/loading.gif"


export default function Dialogs() {
    const dispatch = useDispatch();
    const dialogType = useSelector(selectDialogType);
    const isDialogOpen = useSelector(selectDialogIsOpen);
    const dialogData = useSelector(selectDialogData);
    const dialogInitialData = useSelector(selectDialogInitialData);
    const [attentionIsOpen, setAttentionIsOpen] = useState(false);
    const isAuthLoading = useSelector(state => state.auth.loading)
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
            sx={{
                borderRadius: "16px",
                "& .css-1hju3x6-MuiPaper-root-MuiDialog-paper": isAuthLoading && {
                    background: "transparent",
                    boxShadow: "none",
                }
            }}
        >
            {isAuthLoading ? <Box sx={{
                background: "transparent",
                boxShadow: "none",
            }}>
                <img style={{
                    width: "140px",
                    height: "140px",
                }} src={Loading}/>
            </Box> : <TempComponent {...tempComponentInfo.props} />}
        </Dialog>
    );
}
