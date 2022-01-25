import { IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import { TEMPLATE_DATA } from "../../../../constants/redux/globalData";
import { editCheckboxState, onDelete } from "../../../../helpers/dialog";
import {
  DISABLED_INPUT,
  TEMPLATE_INPUT,
  TEMPLATE_ITEM_BUTTON,
} from "../../../../shared/styles";
import { selectDialogData } from "../../../../store/dialogs/selector";
import { selectGlobalDataViaKey } from "../../../../store/globalData/selector";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";

export default function PhoneGenerator({ data }) {
  const dispatch = useDispatch();
  const dialogData = useSelector(selectDialogData);
  const templateData = useSelector(selectGlobalDataViaKey(TEMPLATE_DATA));
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
      checkboxComponent={
        <Checkbox
          onChange={() => {
            editCheckboxState({ dispatch, dialogData, name: data.name });
          }}
          checked={data.metadata.required}
          disabled={!data.metadata.required_editable}
        />
      }
      buttonComponent={
        data.metadata.deletable ? (
          <IconButton
            sx={TEMPLATE_ITEM_BUTTON}
            onClick={() =>
              onDelete({
                dispatch,
                name: data.name,
                data: templateData,
                dialogData,
              })
            }
          >
            <DeleteIconSVG />
            Delete
          </IconButton>
        ) : null
      }
    />
  );
}
