import { TextField } from "@mui/material";
import { DISABLED_INPUT, TEMPLATE_INPUT } from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function DateGenerator({
  data,
  disabledInput = true,
  disabledCheckbox = true,
}) {
  return (
    <SubSection
      label={data.name}
      inputComponent={
        <TextField
          type="date"
          disabled={disabledInput}
          sx={{ ...TEMPLATE_INPUT, ...(disabledInput ? DISABLED_INPUT : {}) }}
        />
      }
      checkboxComponent={<Checkbox disabled={disabledCheckbox} />}
    />
  );
}
