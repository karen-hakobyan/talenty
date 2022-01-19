import { TextField } from "@mui/material";
import { DISABLED_INPUT, TEMPLATE_INPUT } from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function PhoneGenerator({ data }) {
  return (
    <SubSection
      label="Phone number"
      inputComponent={
        <TextField
          disabled
          placeholder="77 123 456"
          sx={{ ...TEMPLATE_INPUT, ...DISABLED_INPUT }}
        />
      }
      checkboxComponent={<Checkbox />}
    />
  );
}
