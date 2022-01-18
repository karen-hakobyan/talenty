import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import {
  TEMPLATE_ITEM_BUTTON,
  TEMPLATE_ITEM_BUTTON_DISABLED,
} from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";

export default function SpecialNameGenerator({ data, classes }) {
  return (
    <Box>
      <Box
        sx={{
          color: "#4C494F",
          lineHeight: "24px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        {data.name}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <TextField
            placeholder={data.name}
            disabled
            variant="outlined"
            sx={{ width: "421px", background: "#F5F5F5" }}
          />
          <Checkbox checked disabled />
        </Box>
        {/* here should be some condition */}
        <IconButton sx={{ ...TEMPLATE_ITEM_BUTTON_DISABLED }}>
          <DeleteIconSVG />
          Delete
        </IconButton>
      </Box>
    </Box>
  );
}
