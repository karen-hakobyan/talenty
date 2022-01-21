import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import { TEMPLATE_DATA } from "../../../../constants/redux/globalData";
import { onDelete } from "../../../../helpers/dialog";
import { TEMPLATE_ITEM_BUTTON } from "../../../../shared/styles";
import { selectDialogData } from "../../../../store/dialogs/selector";
import { selectGlobalDataViaKey } from "../../../../store/globalData/selector";
import { Checkbox } from "../../../shared/Checkbox";
import Select from "../../../shared/Select";
import SubSection from "../../../shared/subSection";

export default function GenderGenerator({ data }) {
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
                id: data.id,
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
      checkboxComponent={<Checkbox />}
      inputComponent={<Select disabled />}
    />
  );
}
