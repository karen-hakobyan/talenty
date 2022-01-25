import { TextField } from "@mui/material";
import { DISABLED_INPUT, TEMPLATE_INPUT } from "../../../../shared/styles";
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
          disabled={disabledInput}
          placeholder="DD/MM/YYYY"
          sx={{ ...TEMPLATE_INPUT, ...(disabledInput ? DISABLED_INPUT : {}) }}
        />
      }
    />
  );
}
