import { Box, Button, IconButton } from "@mui/material";
import { AddFieldSVG } from "../../assets/icons/createTemplate";
import { TEMPLATE_ITEM_BUTTON } from "../../shared/styles";
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
          fontFamily: "Proxima Nova",
          borderBottom: "2px solid #D2D2D2",
          paddingBottom: "20px",
          marginBottom: "44px",
        }}
      >
        {dialogData.name}
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "auto", gap: "24px" }}>
        {dialogData.fields.map((field) => {
          let TempComponent = typeComponents[field.metadata.type];
          if (!TempComponent) {
            return <h1>they have changed again some type</h1>;
          }
          return <TempComponent data={field} key={field._id} />;
        })}

        {/* section adding part */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <IconButton sx={{ ...TEMPLATE_ITEM_BUTTON, width: "179px" }}>
            <AddFieldSVG />
            Add field
          </IconButton>
          <Button
            sx={{
              ...TEMPLATE_ITEM_BUTTON,
              width: "179px",
              color: "#FFFFFF",
              "&:hover": {
                background: "#8C0DF0",
              },
              "&.Mui-disabled": {
                background: "#9F9F9F",
              },
              background: "#8C0DF0",
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
