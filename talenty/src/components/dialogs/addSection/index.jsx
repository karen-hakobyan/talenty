import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { ADD_TEMPLATE_SECTION, INPUT_LABEL } from "../../../shared/styles";

export default function AddSection({
  setIsOpen,
  setTemplateData,
  templateData,
}) {
  const [value, setValue] = useState("");

  return (
    <Box
      sx={{
        height: "292px",
        width: "569px",
        paddingTop: "24px",
        paddingRight: "24px",
        paddingLeft: "24px",
      }}
    >
      <Box
        sx={{
          fontSize: "18px",
          lineHeight: "18px",
          fontWeight: 600,
          color: "#4C494F",
          fontFamily: "Proxima Nova",
          borderBottom: "2px solid #D2D2D2",
          paddingBottom: "20px",
          marginBottom: "36px",
        }}
      >
        Add section
      </Box>
      <Box sx={INPUT_LABEL}>Section name</Box>
      <TextField
        sx={{ mb: 6 }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
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
