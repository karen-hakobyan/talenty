import { memo } from "react";
import { Box, IconButton, ListItem, ListItemText } from "@mui/material";
import { EditSVG, DeleteIconSVG } from "../../assets/icons/createTemplate";
import { ListItemStyle } from "./CVTemplateStyle";
import {
  TEMPLATE_ITEM_BUTTON,
  TEMPLATE_ITEM_BUTTON_DISABLED,
} from "../../shared/styles";
import { ACTION_WRAPPER } from "./style";

function TemplateItem({ onDialogOpen, item }) {
  return (
    <ListItem sx={ListItemStyle} divider>
      <ListItemText primary={item.name} />
      <Box sx={ACTION_WRAPPER}>
        <IconButton
          onClick={() => onDialogOpen(item)}
          sx={TEMPLATE_ITEM_BUTTON}
        >
          <EditSVG />
          Edit
        </IconButton>
        <IconButton
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
