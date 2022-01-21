import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import {
  DISABLED_INPUT,
  TEMPLATE_INPUT,
  TEMPLATE_ITEM_BUTTON,
} from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";
import { selectGlobalDataViaKey } from "../../../../store/globalData/selector";
import { TEMPLATE_DATA } from "../../../../constants/redux/globalData";
import { onDelete } from "../../../../helpers/dialog";
import { selectDialogData } from "../../../../store/dialogs/selector";

export default function SpecialNameGenerator({ data }) {
  console.log(data);
  const dispatch = useDispatch();
  const dialogData = useSelector(selectDialogData);
  const templateData = useSelector(selectGlobalDataViaKey(TEMPLATE_DATA));

  return (
    <>
      <SubSection
        label={data.name}
        inputComponent={
          <TextField
            placeholder={data?.name}
            disabled
            variant="outlined"
            sx={{ ...TEMPLATE_INPUT, ...DISABLED_INPUT }}
          />
        }
        checkboxComponent={
          <Checkbox
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
      />
    </>
  );
}
