import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import {
  FIELD_CHECKBOX_CONTAINER,
  INPUT_LABEL,
  TEMPLATE_ITEM_BUTTON_DISABLED,
} from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";

export default function SpecialNameGenerator({ data }) {
  return (
    <Box>
      <Box sx={INPUT_LABEL}>{data?.name}</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={FIELD_CHECKBOX_CONTAINER}>
          <TextField
            placeholder={data?.name}
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
