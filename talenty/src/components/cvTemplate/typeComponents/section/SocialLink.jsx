import { Box } from "@mui/material";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCheckboxLink } from "../../../../helpers/dialog/index.js";
import { selectDialogData } from "../../../../store/dialogs/selector.js";
import { Checkbox } from "../../../shared/Checkbox.jsx";
import SOCIAL_LINK_ICONS from "./socialLinkIcons.js";

export default function SocialLink({ data }) {
  const dispatch = useDispatch();
  const dialogData = useSelector(selectDialogData);
  let Icon = SOCIAL_LINK_ICONS[data.name];
  if (Icon) {
    Icon = memo(Icon);
  }
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "14px" }}>
      <Icon />
      <Checkbox
        checked={data.metadata.required}
        onChange={() => {
          editCheckboxLink({ dispatch, id: data.id, dialogData });
        }}
      />
    </Box>
  );
}
