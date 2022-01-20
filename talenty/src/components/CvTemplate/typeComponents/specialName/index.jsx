import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, TextField } from "@mui/material";
import { DeleteIconSVG } from "../../../../assets/icons/createTemplate";
import {
  DISABLED_INPUT,
  TEMPLATE_INPUT,
  TEMPLATE_ITEM_BUTTON_DISABLED,
} from "../../../../shared/styles";
import { Checkbox } from "../../../shared/Checkbox";
import SubSection from "../../../shared/subSection";
import { selectGlobalDataViaKey } from "../../../../store/globalData/selector";
import {
  TEMPLATE_DATA,
  UPDATED_TEMPLATE_DATA,
} from "../../../../constants/redux/globalData";
import { setGlobalDataViaKey } from "../../../../store/globalData/slice";

export default function SpecialNameGenerator({ data }) {
  console.log(data);
  const dispatch = useDispatch();
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
              sx={{ ...TEMPLATE_ITEM_BUTTON_DISABLED }}
              onClick={() => {
                onDelete({ dispatch, id: data._id, data: templateData });
              }}
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

function onDelete({ dispatch, id, data }) {
  console.log("mtav");
  let result = JSON.parse(JSON.stringify(data), (key, value) => {
    if (value.fields) {
      return value.fields.filter((field) => field._id !== id);
    }
    return value;
  });
  if (result) {
    dispatch(
      setGlobalDataViaKey({ key: UPDATED_TEMPLATE_DATA, value: result })
    );
  }
}
