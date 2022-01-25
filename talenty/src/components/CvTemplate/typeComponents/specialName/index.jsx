import React from "react";
import { IconButton, TextField } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import {
  DISABLED_INPUT,
  TEMPLATE_INPUT,
  TEMPLATE_ITEM_BUTTON_DISABLED,
} from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function SpecialNameGenerator({
  data,
  disabledInput = true,
  disabledCheckbox = true,
}) {
  return (
    <SubSection
      label={data.name}
      inputComponent={
        <TextField
          placeholder={data?.name}
          disabled={disabledInput}
          variant="outlined"
          sx={{ ...TEMPLATE_INPUT, ...(disabledInput ? DISABLED_INPUT : {}) }}
        />
      }
      checkboxComponent={<Checkbox checked disabled={disabledCheckbox} />}
      buttonComponent={
        <IconButton sx={{ ...TEMPLATE_ITEM_BUTTON_DISABLED }}>
          <DeleteIconSVG />
          Delete
        </IconButton>
      }
    />
  );
}
