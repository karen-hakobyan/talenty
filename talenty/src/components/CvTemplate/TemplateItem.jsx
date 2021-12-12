import { Box, ListItem, ListItemText } from "@mui/material";
import {
  EditBtnSVG,
  DisabledDeleteBtnSVG,
  DeleteBtn,
} from "../Assets/Icons/CreateTemplate";
import { ListItemStyle } from "./CVTemplateStyle";

function TemplateItem({ fieldName, metadata }) {
  return (
    <ListItem sx={ListItemStyle} divider>
      <ListItemText primary={fieldName} />
      <Box component="img" src={EditBtnSVG} alt="edit" />
      {metadata.deletable ? (
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

export default TemplateItem;
