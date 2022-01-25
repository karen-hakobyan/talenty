import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import { TEMPLATE_DATA } from "../../../../constants/redux/globalData";
import { editCheckboxState, onDelete } from "../../../../helpers/dialog";
import { TEMPLATE_ITEM_BUTTON } from "../../../../shared/styles";
import { selectDialogData } from "../../../../store/dialogs/selector";
import { selectGlobalDataViaKey } from "../../../../store/globalData/selector";
import { Checkbox } from "../../../shared/Checkbox";
import Select from "../../../shared/Select";
import SubSection from "../../../shared/subSection";

export default function CountryGenerator({ data }) {
  const dispatch = useDispatch();
  const dialogData = useSelector(selectDialogData);
  const templateData = useSelector(selectGlobalDataViaKey(TEMPLATE_DATA));

  return (
    <SubSection
      label={data.name}
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
      checkboxComponent={
        <Checkbox
          onChange={() => {
            editCheckboxState({ dispatch, dialogData, name: data.name });
          }}
          checked={data.metadata.required}
          disabled={!data.metadata.required_editable}
        />
      }
      inputComponent={<Select disabled />}
    />
  );
}
