import { memo } from "react";
import { ListItem, ListItemText } from "@mui/material";
import {
  EditBtnSVG,
  DisabledDeleteBtnSVG,
  DeleteBtn,
} from "../../assets/icons/createTemplate";
import { ListItemStyle } from "./CVTemplateStyle";

function TemplateItem({ onDialogOpen, item }) {
  return (
    <ListItem sx={ListItemStyle} divider>
      <ListItemText primary={item.name} />
      <EditBtnSVG onClick={() => onDialogOpen(item)} />
      {item.metadata.deletable ? (
        <DeleteBtn />
      ) : (
        <DisabledDeleteBtnSVG />
      )}
    </ListItem>
  );
}

export default memo(TemplateItem);
