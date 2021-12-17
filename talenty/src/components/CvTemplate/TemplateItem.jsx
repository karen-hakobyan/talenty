import { Box, ListItem, ListItemText } from "@mui/material";
import { memo } from "react";
import {
  EditBtnSVG,
  DisabledDeleteBtnSVG,
  DeleteBtn,
} from "../Assets/Icons/CreateTemplate";
import { ListItemStyle } from "./CVTemplateStyle";

function TemplateItem({ onDialogOpen, item }) {
  return (
    <ListItem sx={ListItemStyle} divider>
      <ListItemText primary={item.name} />
      <Box
        component="img"
        src={EditBtnSVG}
        onClick={() => onDialogOpen(item)}
        alt="edit"
      />
      {item.metadata.deletable ? (
        <Box
          component="img"
          src={DeleteBtn}
          alt="delete"
          className="deleteBtn"
        />
      ) : (
        <Box component="img" src={DisabledDeleteBtnSVG} alt="disabled delete" />
      )}
    </ListItem>
  );
}

export default memo(TemplateItem);
