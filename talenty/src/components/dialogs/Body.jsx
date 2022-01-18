import { Box } from "@mui/material";
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
      </Box>
    </Box>
  );
}
