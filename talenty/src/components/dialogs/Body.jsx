import { Box } from "@mui/material";
import { Fragment } from "react";
import typeComponents from "../CvTemplate/typeComponents";

export default function Body({ dialogData }) {
  if (!dialogData) {
    return null;
  }
  return (
    <Box
      sx={{
        width: "950px",
        padding: "36px 24px",
      }}
    >
      <Box
        sx={{
          fontSize: "18px",
          lineHeight: "18px",
          fontWeight: 600,
          color: "#4C494F",
          borderBottom: "2px solid #D2D2D2",
          paddingBottom: "20px",
        }}
      >
        {dialogData.name}
      </Box>
      {dialogData.fields.map((field) => {
        return (
          <Fragment>{typeComponents[field.metadata.type](field)}</Fragment>
        );
      })}
    </Box>
  );
}
