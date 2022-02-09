import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { specialNameType } from "../../../constants/dataTypes";
import { isDisabled } from "../../../helpers/dialog";
import {
  ADD_TEMPLATE_SECTION,
  DIALOG_ADD_SECTION_CONTAINER,
  DIALOG_TITLE_CONTAINER,
  INPUT_LABEL,
} from "../../../shared/styles";
import { setDialogData } from "../../../store/dialogs/slice";

export default function AddField({ dialogData, setIsOpen }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  return (
    <Box sx={DIALOG_ADD_SECTION_CONTAINER}>
      <Box sx={DIALOG_TITLE_CONTAINER}>Add field</Box>
      <Box sx={INPUT_LABEL}>Field name</Box>
      <TextField
        placeholder="Add field name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ mb: 6, width: "100%" }}
        InputProps={{ sx: { height: "40px" } }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          sx={ADD_TEMPLATE_SECTION}
          style={{ textTransform: "none" }}
          onClick={() => {
            onAdd({ dispatch, value, dialogData });
            setIsOpen(false);
          }}
          disabled={isDisabled({ templateData: dialogData, value })}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

const addFieldParamsGenerator = (value) => ({
  id: null,
  name: value,
  metadata: {
    type: specialNameType,
    required_editable: true,
    editable: false,
    required: false,
    deletable: true,
    maxLength: 20,
  },
});

function onAdd({ dispatch, dialogData, value }) {
  const result =
    dialogData.fields[0]?.metadata.type === "section_container"
      ? {
          ...dialogData,
          fields: [
            {
              ...dialogData.fields[0],
              fields: [
                ...dialogData.fields[0].fields,
                addFieldParamsGenerator(value),
              ],
            },
          ],
        }
      : {
          ...dialogData,
          fields: [...dialogData.fields, addFieldParamsGenerator(value)],
        };
  dispatch(setDialogData(result));
}
