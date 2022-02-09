import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import {
  ADD_TEMPLATE_SECTION,
  DIALOG_ADD_SECTION_CONTAINER,
  DIALOG_TITLE_CONTAINER,
  INPUT_LABEL,
} from "../../../shared/styles";

export default function AddSection({
  setIsOpen,
  setTemplateData,
  templateData,
}) {
  const [value, setValue] = useState("");

  return (
    <Box sx={DIALOG_ADD_SECTION_CONTAINER}>
      <Box sx={DIALOG_TITLE_CONTAINER}>Add section</Box>
      <Box sx={INPUT_LABEL}>Section name</Box>
      <TextField
        sx={{ mb: 6, width: "100%" }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
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
            onAdd({ setTemplateData, value });
            setIsOpen(false);
          }}
          disabled={isDisabled({ templateData, value })}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

function onAdd({ setTemplateData, value }) {
  setTemplateData((prev) => {
    return {
      ...prev,
      fields: [
        ...prev.fields,
        {
          id: null,
          name: value,
          fields: [],
          metadata: {
            type: "section",
            deletable: true,
          },
        },
      ],
    };
  });
}

function isDisabled({ templateData, value }) {
  return (
    templateData.fields.some((el) => el.name === value) || value.length === 0
  );
}
