import { Box, Button, Dialog, IconButton, TextField } from "@mui/material";
import { useEffect } from "react";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFieldSVG,
  TemplateNamePenSVG,
} from "../../assets/icons/createTemplate";
import {
  TEMPLATE_DATA,
  UPDATED_TEMPLATE_DATA,
} from "../../constants/redux/globalData";
import {
  DIALOG_MAIN_CONTAINER,
  DIALOG_TITLE_CONTAINER,
  TEMPLATE_ITEM_BUTTON,
} from "../../shared/styles";
import { setDialogData, setDialogIsOpen } from "../../store/dialogs/slice";
import { selectGlobalDataViaKey } from "../../store/globalData/selector";
import { setGlobalDataViaKey } from "../../store/globalData/slice";
import typeComponents from "../cvTemplate/typeComponents";
import AddField from "./addField";
import Attention from "./attention";

export default function Body({
  dialogData,
  attentionIsOpen,
  setAttentionIsOpen,
}) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(dialogData?.name);
  const [addFieldIsOpen, setAddFieldIsOpen] = useState(false);
  const templateData = useSelector(selectGlobalDataViaKey(TEMPLATE_DATA));
  const [isTitleText, setIsTitleText] = useState(true);
  useEffect(() => {
    setTitle(dialogData?.name);
  }, [dialogData]);

  if (!dialogData) {
    return null;
  }

  return (
    <Box sx={DIALOG_MAIN_CONTAINER}>
      <Dialog
        open={addFieldIsOpen}
        onClose={() => setAddFieldIsOpen(false)}
        maxWidth={false}
      >
        <AddField dialogData={dialogData} setIsOpen={setAddFieldIsOpen} />
      </Dialog>
      <Dialog open={attentionIsOpen} onClose={() => setAttentionIsOpen(false)}>
        <Attention {...{ setAttentionIsOpen }} />
      </Dialog>

      <Box
        sx={{
          display: "flex",
          gap: "14px",
          alignItems: "center",
          borderBottom: "2px solid #D2D2D2",
          paddingBottom: "20px",
          marginBottom: "36px",
          justifyContent: "space-between",
        }}
      >
        {isTitleText ? (
          <Box sx={DIALOG_TITLE_CONTAINER}>{dialogData.name}</Box>
        ) : (
          <TextField
            sx={{ width: "100%" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setIsTitleText(true);
              dispatch(setDialogData({ ...dialogData, name: title }));
            }}
          />
        )}
        <TemplateNamePenSVG
          onClick={() => setIsTitleText(false)}
          style={{
            cursor: isTitleText ? "pointer" : "default",
          }}
        />
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "auto", gap: "24px" }}>
        {dialogData.fields.map((field) => {
          // if status deleted show nothing
          if (field.metadata.status === "deleted") {
            return null;
          }
          let TempComponent = typeComponents[field.metadata.type];
          if (!TempComponent) {
            return <h1>they have changed again some type</h1>;
          }
          TempComponent = memo(TempComponent);

          return (
            <TempComponent
              data={field}
              key={field.name}
              {...{ dialogData, dispatch, templateData }}
            />
          );
        })}

        {/* section adding part */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
          <IconButton
            sx={{ ...TEMPLATE_ITEM_BUTTON, width: "179px" }}
            onClick={() => {
              setAddFieldIsOpen(true);
            }}
          >
            <AddFieldSVG />
            Add field
          </IconButton>
          <Button
            onClick={() => {
              onSave({ dispatch, dialogData, templateData });
            }}
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
            style={{ textTransform: "none" }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function onSave({ dialogData, dispatch, templateData }) {
  const result = JSON.parse(JSON.stringify(templateData), (key, value) => {
    if (!value?.id) {
      return value;
    }
    if (value.id === dialogData.id) {
      return dialogData;
    } else {
      return value;
    }
  });
  dispatch(setGlobalDataViaKey({ key: UPDATED_TEMPLATE_DATA, value: result }));
  dispatch(setDialogIsOpen(false));
}
