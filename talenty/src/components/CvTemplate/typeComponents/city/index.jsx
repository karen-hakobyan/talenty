import { TextField } from "@mui/material";
import { DISABLED_INPUT, TEMPLATE_INPUT } from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function CityGenerator() {
  return (
    <SubSection
      label="Email"
      inputComponent={
        <TextField
          disabled
          placeholder="Your email"
          sx={{ ...TEMPLATE_INPUT, ...DISABLED_INPUT }}
        />
      }
      checkboxComponent={<Checkbox />}
    />
  );
}
