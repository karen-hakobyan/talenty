import { TextField } from "@mui/material";
import { DISABLED_INPUT, TEMPLATE_INPUT } from "../../../../shared/styles";

export default function ExpectedSalary({ data }) {
  return (
    <TextField
      placeholder={data?.name}
      disabled
      variant="outlined"
      sx={{ ...TEMPLATE_INPUT, ...DISABLED_INPUT, width: "321px" }}
    />
  );
}
