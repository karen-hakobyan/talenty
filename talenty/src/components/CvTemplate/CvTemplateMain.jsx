import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Dialog, IconButton, Typography } from "@mui/material";
import { PINK } from "../../constants/colors";
import {
  AddSectionIconSVG,
  CreateCVTemplateSVG,
  ListSVG,
} from "../../assets/icons/createTemplate";
import { Box } from "@mui/system";
import TemplateItem from "./TemplateItem";
import hrExData from "../../helpers/ajabsandal";
import { globalDataSetter } from "../../request/get";
import {
  localStorageGetter,
  localStorageSetter,
} from "../../helpers/localStorage";
import { TEMPLAT_DATA } from "../../constants/localStorage";
import { setGlobalDataViaKey } from "../../store/globalData/slice";
import { selectGlobalDataViaKey } from "../../store/globalData/selector";
import { UPDATED_TEMPLATE_DATA } from "../../constants/redux/globalData";
import {
  TEMPLATE_BUTTON_ADD,
  TEMPLATE_BUTTON_CREATE,
} from "../../shared/styles";
import { compareObjects } from "../../helpers/compareTwoData";
import AddSection from "../dialogs/addSection";

function CvTemplateMain() {
  const [data, setData] = useState(null);
  const [unchangeData, setUnchangedData] = useState(null);
  const [addSectionDialogIsOpen, setAddSectionDialogIsOpen] = useState(false);
  const updatedTemplateData = useSelector(
    selectGlobalDataViaKey(UPDATED_TEMPLATE_DATA)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatedTemplateData) {
      setData(updatedTemplateData);
    }
  }, [updatedTemplateData]);
  // update local storage whenever data changed and also redux
  useEffect(() => {
    if (data) {
      setUnchangedData((prev) => {
        if (!prev) {
          return data;
        }
        return prev;
      });
      localStorageSetter(TEMPLAT_DATA, data);
      dispatch(setGlobalDataViaKey({ key: TEMPLAT_DATA, value: data }));
    }
  }, [data, dispatch]);
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
      <Dialog
        open={addSectionDialogIsOpen}
        maxWidth={false}
        onClose={() => {
          setAddSectionDialogIsOpen(false);
        }}
      >
        <AddSection
          setIsOpen={setAddSectionDialogIsOpen}
          setTemplateData={setData}
          templateData={data}
        />
      </Dialog>
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
        <TemplateItem key={item.name} item={item} setData={setData} />
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
        <IconButton
          sx={TEMPLATE_BUTTON_ADD}
          onClick={() => {
            setAddSectionDialogIsOpen(true);
          }}
        >
          <AddSectionIconSVG />
          Add section
        </IconButton>
        <IconButton
          sx={TEMPLATE_BUTTON_CREATE}
          disabled={compareObjects(data, unchangeData)}
        >
          <CreateCVTemplateSVG />
          Create CV
        </IconButton>
      </Box>
    </Container>
  );
}

export default CvTemplateMain;
