import { IconButton } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import { TEMPLATE_ITEM_BUTTON } from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import Select from "../../../shared/Select";
import SubSection from "../../../shared/subSection";

export default function GenderGenerator({ data }) {
  return (
    <SubSection
      label={data.name}
      buttonComponent={
        <IconButton sx={TEMPLATE_ITEM_BUTTON}>
          <DeleteIconSVG />
          Delete
        </IconButton>
      }
      checkboxComponent={<Checkbox />}
      inputComponent={<Select disabled />}
    />
  );
}
