import { Box } from "@mui/material";
import { memo } from "react";
import { editLinkCheckboxState } from "../../../../helpers/dialog/index.js";
import { Checkbox } from "../../../shared/Checkbox.jsx";
import SOCIAL_LINK_ICONS from "./socialLinkIcons.js";

export default function SocialLink({ data, dispatch, dialogData }) {
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
          editLinkCheckboxState({ dispatch, id: data.id, dialogData });
        }}
      />
    </Box>
  );
}
