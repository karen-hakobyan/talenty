import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  styled } from "@mui/system";
import { Dialog, IconButton, Typography, Box, TextField } from "@mui/material";
import { PINK } from "../../constants/colors";
import {
  AddSectionIconSVG,
  CreateCVTemplateSVG,
  ListSVG,
  TemplateNamePenSVG,
} from "../../assets/icons/createTemplate";
import TemplateItem from "./TemplateItem";
import hrExData from "../../helpers/ajabsandal";
import { globalDataSetter } from "../../request/get";
import {
  localStorageGetter,
  localStorageSetter,
} from "../../helpers/localStorage";
import {
  TEMPLATE_INITIAL_DATA,
  TEMPLAT_DATA,
} from "../../constants/localStorage";
import { setGlobalDataViaKey } from "../../store/globalData/slice";
import { selectGlobalDataViaKey } from "../../store/globalData/selector";
import { UPDATED_TEMPLATE_DATA } from "../../constants/redux/globalData";
import {
  TEMPLATE_BUTTON_ADD,
  TEMPLATE_BUTTON_CREATE,
} from "../../shared/styles";
import { compareObjects } from "../../helpers/compareTwoData";
import AddSection from "../dialogs/addSection";
import { checkUserExistence } from "../../helpers/actions";

import { ENTER_KEY } from "../../constants/keyCodes";
import { useRef } from "react";


const CustomInput=styled("input")(({theme})=>({
  width:"100%",
  outline:"none",
  border:"none",
  fontFamily: "Proxima Nova",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "18px",
  "&:disabled":{
    backgroundColor:"transparent"
  },
  "&::placeholder":{
    color:"#4C494F"

  }
}))

const placeholderInput = "System Template"

function CvTemplateMain() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState(null);
  const [isTemplateNameText, setIsTemplateNameText] = useState(true);
  const [unchangeData, setUnchangedData] = useState(null);
  const [addSectionDialogIsOpen, setAddSectionDialogIsOpen] = useState(false);
  const customInput = useRef(null)
  
  const navigate = useNavigate();
  const updatedTemplateData = useSelector(
    selectGlobalDataViaKey(UPDATED_TEMPLATE_DATA)
  );
  useEffect(() => {
    setTitle(data?.name || "");
  }, [data]);
  useEffect(() => {
    checkUserExistence(navigate);
  }, [navigate]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (updatedTemplateData) {
      setData(updatedTemplateData);
    }
  }, [updatedTemplateData]);
  // update local storage whenever data changed and also redux
  useEffect(() => {
    if (data) {
      let unchangedData = localStorageGetter(TEMPLATE_INITIAL_DATA);
      setUnchangedData(unchangedData);
      localStorageSetter(TEMPLAT_DATA, data);
      dispatch(setGlobalDataViaKey({ key: TEMPLAT_DATA, value: data }));
    }
  }, [data, dispatch]);
  useEffect(() => {
    let storageExistingData = localStorageGetter(TEMPLAT_DATA);
    storageExistingData
      ? setData(storageExistingData)
      : globalDataSetter({
          stateSetter: (data) => {
            setData(data);
            localStorageSetter(TEMPLATE_INITIAL_DATA, data);
          },
          urlKey: "getTemplates",
          errorAction: () => setData(hrExData),
        });
  }, []);

  if (!data) {
    return null;
  }
  

  return (
    <Box sx={{ width: "100%", pr: "24px", pl: "24px", pb: "24px" }}>
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
      <Box sx={{ display: "flex", paddingTop: "24px" }}>
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
      <Box
        sx={{
          width: "100%",
          borderBottom: "2px solid #D2D2D2",
          display: "flex",
          marginTop: "52px",
          paddingBottom: "14px",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <TemplateNamePenSVG
          onClick={() => {
            setIsTemplateNameText(false);
            setData((prev) => ({ ...prev, name: "" }));
            setTimeout(()=>customInput.current.focus())
            
          }}
          style={{ cursor: isTemplateNameText ? "pointer" : "default" }}
        />
        <CustomInput
            ref={customInput}
            placeholder={placeholderInput}
            value={title}
            disabled={isTemplateNameText?true:false}

            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onBlur={() => {
              setIsTemplateNameText(true);
              setData((prev) => ({ ...prev, name: title }));
            }}
            onKeyDown={(event) => {
              if (event.key === ENTER_KEY) {
                setIsTemplateNameText(true);
                setData((prev) => ({ ...prev, name: title }));
              }
            }}
          />
        
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
    </Box>
  );
}

export default CvTemplateMain;
