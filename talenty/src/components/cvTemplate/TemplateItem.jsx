import {memo, useCallback} from "react";
import {useDispatch} from "react-redux";
import {Box, IconButton, ListItem, ListItemText} from "@mui/material";
import {ListItemStyle} from "./CVTemplateStyle";
import {DeleteIconSVG, EditSVG} from "../../assets/icons/createTemplate";
import {TEMPLATE_ITEM_BUTTON, TEMPLATE_ITEM_BUTTON_DISABLED,} from "../../shared/styles";
import {ACTION_WRAPPER} from "./style";
import {setDialogData, setDialogInitialData, setDialogIsOpen, setDialogType,} from "../../store/dialogs/slice";

function onDelete(setData, item, data) {
    setData({
        ...data,
        fields: item.id ? data.fields.map(el => el.name === item.name ? {
            ...el,
            metadata: {...el.metadata, status: 'DELETED'}
        } : el) : data.fields.filter(el => el.name !== item.name)
    });
}

function TemplateItem({item, setData, isAnnouncement, data}) {
    const dispatch = useDispatch();
    const onEdit = useCallback(
        (item) => {
            dispatch(setDialogData(item));
            dispatch(setDialogIsOpen(true));
            dispatch(setDialogType(isAnnouncement ? 'announcement' : "body"));
            dispatch(setDialogInitialData(item));
        },
        [dispatch, isAnnouncement]
    );

    return (
        <ListItem sx={ListItemStyle} divider>
            <ListItemText primary={item.name}/>
            <Box sx={ACTION_WRAPPER}>
                <IconButton sx={TEMPLATE_ITEM_BUTTON} onClick={() => onEdit(item)}>
                    <EditSVG/>
                    Edit
                </IconButton>
                {item.metadata.deletable && <IconButton
                    onClick={() => {
                        onDelete(setData, item, data);
                    }}
                    disabled={!item.metadata.deletable}
                    sx={
                        item.metadata.deletable
                            ? TEMPLATE_ITEM_BUTTON
                            : TEMPLATE_ITEM_BUTTON_DISABLED
                    }
                >
                    <DeleteIconSVG/>
                    Delete
                </IconButton>}
            </Box>
        </ListItem>
    );
}

export default memo(TemplateItem);
