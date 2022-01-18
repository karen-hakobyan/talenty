import { Box, IconButton } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import {
  FIELD_CHECKBOX_CONTAINER,
  INPUT_LABEL,
  TEMPLATE_ITEM_BUTTON,
} from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import Select from "../../../shared/Select";

export default function GenderGenerator({ data }) {
  console.log(data, "checkbox");
  return (
    <Box>
      <Box>
        <Box>
          <Box sx={INPUT_LABEL}>{data.name}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={FIELD_CHECKBOX_CONTAINER}>
              <Select disabled />
              <Checkbox />
            </Box>
            <IconButton sx={TEMPLATE_ITEM_BUTTON}>
              <DeleteIconSVG />
              Delete
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
