import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import { ListItemStyle } from "./CVTemplateStyle";
import { EditSVG, DeleteIconSVG } from "../../assets/icons/createTemplate";
import {
  TEMPLATE_ITEM_BUTTON,
  TEMPLATE_ITEM_BUTTON_DISABLED,
} from "../../shared/styles";
import { ACTION_WRAPPER } from "./style";
import {
  setDialogData,
  setDialogInitialData,
  setDialogIsOpen,
  setDialogType,
} from "../../store/dialogs/slice";

function onDelete(setData, name) {
  setData((prevState) => {
    return {
      ...prevState,
      fields: prevState.fields.filter((el) => el.name !== name),
    };
  });
}

function TemplateItem({ item, setData }) {
  const dispatch = useDispatch();
  const onEdit = useCallback(
    (item) => {
      dispatch(setDialogData(item));
      dispatch(setDialogIsOpen(true));
      dispatch(setDialogType("body"));
      dispatch(setDialogInitialData(item));
    },
    [dispatch]
  );

  return (
    <ListItem sx={ListItemStyle} divider>
      <ListItemText primary={item.name} />
      <Box sx={ACTION_WRAPPER}>
        <IconButton sx={TEMPLATE_ITEM_BUTTON} onClick={() => onEdit(item)}>
          <EditSVG />
          Edit
        </IconButton>
        <IconButton
          onClick={() => {
            onDelete(setData, item.name);
          }}
          disabled={!item.metadata.deletable}
          sx={
            item.metadata.deletable
              ? TEMPLATE_ITEM_BUTTON
              : TEMPLATE_ITEM_BUTTON_DISABLED
          }
        >
          <DeleteIconSVG />
          Delete
        </IconButton>
      </Box>
    </ListItem>
  );
}

export default memo(TemplateItem);
