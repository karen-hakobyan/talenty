import { useEffect, useState } from "react";
import { Container, IconButton, Typography } from "@mui/material";
import { PINK } from "../../constants/colors";
import {
  AddSectionIconSVG,
  ListSVG,
  CreateCV,
} from "../../assets/icons/createTemplate";
import { Box } from "@mui/system";
import { StyledBtns } from "./CVTemplateStyle";
import TemplateItem from "./TemplateItem";
import hrExData from "../../helpers/ajabsandal";
import { globalDataSetter } from "../../request/get";
import {
  localStorageGetter,
  localStorageSetter,
} from "../../helpers/localStorage";
import { TEMPLAT_DATA } from "../../constants/localStorage";

function CvTemplateMain() {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      localStorageSetter(TEMPLAT_DATA, data);
    }
  }, [data]);

  useEffect(() => {
    let storageExistingData = localStorageGetter(TEMPLAT_DATA);

    storageExistingData
      ? setData(storageExistingData)
      : globalDataSetter({
          stateSetter: setData,
          urlKey: "getTemplates",
          errorAction: () => setData(hrExData),
        });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Container>
      <Box sx={{ display: "flex", mt: 5 }}>
        <ListSVG />
        <Typography
          sx={{
            fontWeight: 600,
            color: PINK,
            fontFamily: "Proxima Nova",
            fontSize: "20px",
          }}
          variant="h5"
        >
          Create CV Template
        </Typography>
      </Box>
      {data.fields.map((item) => (
        <TemplateItem key={item._id} item={item} setData={setData} />
      ))}
      <Box sx={StyledBtns}>
        <IconButton
          sx={{
            display: "flex",
            width: "179px",
            height: "34px",
            justifyContent: "center",
            alignItems: "center",
            gap: "9px",
            fontSize: "14px",
            borderRadius: "6px",
            border: "1px solid #ECECEC",
          }}
        >
          <AddSectionIconSVG />
          Add section
        </IconButton>
        <IconButton>
          <CreateCV />
        </IconButton>
      </Box>
    </Container>
  );
}

export default CvTemplateMain;
